"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";

type Row = Record<string, string | number | boolean | null | undefined> & { id: string; created_at: string };
type Data = { members: Row[]; gyms: Row[] };
type Tab = "members" | "gyms" | "reports";
type Column = { key: string; label: string; format?: (row: Row) => string };

const date = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
const dayKey = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const rupees = (n: number) => `₹${Math.round(n).toLocaleString("en-IN")}`;
const cityOf = (row: Row) => String(row.city ?? "").trim().replace(/\s+/g, " ").toLowerCase();
const titleCase = (s: string) => s.replace(/\b\w/g, (c) => c.toUpperCase());

const columns: Record<"members" | "gyms", Column[]> = {
  members: [
    { key: "created_at", label: "Joined", format: (r) => date(r.created_at) },
    { key: "full_name", label: "Name" },
    { key: "phone", label: "Mobile" },
    { key: "email", label: "Email" },
    { key: "city", label: "City" },
    { key: "area", label: "Area" },
    { key: "current_gym", label: "Current gym" },
    { key: "workout_frequency", label: "Trains" },
    { key: "monthly_spend", label: "Pays now" },
  ],
  gyms: [
    { key: "created_at", label: "Joined", format: (r) => date(r.created_at) },
    { key: "gym_name", label: "Gym" },
    { key: "contact_name", label: "Contact" },
    { key: "phone", label: "Mobile" },
    { key: "email", label: "Email" },
    { key: "city", label: "City" },
    { key: "area", label: "Area" },
    { key: "monthly_fee", label: "Monthly fee (₹)" },
    { key: "day_rate", label: "Day rate (₹)", format: (r) => (typeof r.monthly_fee === "number" ? String(Math.round(r.monthly_fee / 30)) : "") },
    { key: "active_members", label: "Active members" },
    { key: "message", label: "Note" },
  ],
};

const cell = (row: Row, col: Column) => (col.format ? col.format(row) : String(row[col.key] ?? ""));

function downloadCsv(filename: string, header: string[], rows: string[][]) {
  const escape = (value: string) => {
    // Stop spreadsheet apps from running a cell as a formula.
    const safe = /^[=+\-@]/.test(value) ? `'${value}` : value;
    return `"${safe.replace(/"/g, '""')}"`;
  };
  const csv = [header, ...rows].map((r) => r.map(escape).join(",")).join("\r\n");
  const url = URL.createObjectURL(new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

const countBy = (rows: Row[], key: string) => {
  const map = new Map<string, number>();
  for (const row of rows) {
    const k = String(row[key] ?? "") || "Not answered";
    map.set(k, (map.get(k) ?? 0) + 1);
  }
  return [...map.entries()].sort((a, b) => b[1] - a[1]);
};

export default function AdminApp() {
  const [auth, setAuth] = useState<"checking" | "out" | "in">("checking");
  const [data, setData] = useState<Data>({ members: [], gyms: [] });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState<Tab>("reports");
  // Sidebar: collapses to an icon rail on desktop, slides over the page on phones.
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileNav, setMobileNav] = useState(false);
  // The sign-up currently open in the details panel.
  const [viewing, setViewing] = useState<{ row: Row; kind: "members" | "gyms" } | null>(null);
  const [query, setQuery] = useState("");
  const [city, setCity] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [frequency, setFrequency] = useState("");
  // Time of the last load; reports and date limits are measured from it.
  const [loadedAt, setLoadedAt] = useState(0);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/data", { cache: "no-store" });
      if (res.status === 401) {
        setAuth("out");
        return;
      }
      const body = await res.json();
      if (!res.ok) setError(body.error ?? "Could not load the waitlist data.");
      else setData(body);
      setLoadedAt(Date.now());
      setAuth("in");
    } catch {
      setError("No connection to the server.");
      setAuth("in");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial fetch of the admin data
    load();
  }, [load]);

  const toggleSidebar = useCallback(() => {
    if (window.matchMedia("(max-width: 900px)").matches) setMobileNav((v) => !v);
    else setSidebarOpen((v) => !v);
  }, []);

  // Ctrl/Cmd + B toggles the sidebar.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "b") {
        e.preventDefault();
        toggleSidebar();
      }
      if (e.key === "Escape") {
        setMobileNav(false);
        setViewing(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [toggleSidebar]);

  async function login(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const password = new FormData(e.currentTarget).get("password");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) load();
    else setError((await res.json()).error ?? "Could not sign in.");
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    setData({ members: [], gyms: [] });
    setAuth("out");
  }

  const all = useMemo(() => [...data.members, ...data.gyms], [data]);
  const cities = useMemo(() => [...new Set(all.map(cityOf).filter(Boolean))].sort(), [all]);
  const frequencies = useMemo(
    () => [...new Set(data.members.map((m) => String(m.workout_frequency ?? "")).filter(Boolean))].sort(),
    [data.members],
  );

  const list = tab === "gyms" ? "gyms" : "members";
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return data[list].filter((row) => {
      if (city && cityOf(row) !== city) return false;
      const day = dayKey(new Date(row.created_at));
      if (from && day < from) return false;
      if (to && day > to) return false;
      if (list === "members" && frequency && row.workout_frequency !== frequency) return false;
      if (!q) return true;
      return Object.values(row).some((v) => v != null && String(v).toLowerCase().includes(q));
    });
  }, [data, list, query, city, from, to, frequency]);

  const hasFilters = Boolean(query || city || from || to || frequency);
  const clearFilters = () => {
    setQuery("");
    setCity("");
    setFrom("");
    setTo("");
    setFrequency("");
  };

  // Reports
  const report = useMemo(() => {
    const byCity = cities
      .map((c) => ({
        city: titleCase(c),
        members: data.members.filter((m) => cityOf(m) === c).length,
        gyms: data.gyms.filter((g) => cityOf(g) === c).length,
      }))
      .sort((a, b) => b.members + b.gyms - (a.members + a.gyms));

    const days = Array.from({ length: 14 }, (_, i) => {
      const d = new Date(loadedAt);
      d.setDate(d.getDate() - (13 - i));
      const key = dayKey(d);
      const on = (rows: Row[]) => rows.filter((r) => dayKey(new Date(r.created_at)) === key).length;
      return {
        key,
        label: d.toLocaleDateString("en-IN", { day: "2-digit", month: "short" }),
        members: on(data.members),
        gyms: on(data.gyms),
      };
    });

    const fees = data.gyms.map((g) => g.monthly_fee).filter((f): f is number => typeof f === "number" && f > 0);
    const avgFee = fees.length ? fees.reduce((a, b) => a + b, 0) / fees.length : null;
    const activeMembers = data.gyms.reduce((sum, g) => sum + (typeof g.active_members === "number" ? g.active_members : 0), 0);
    const weekAgo = loadedAt - 7 * 86_400_000;
    const last7 = all.filter((r) => new Date(r.created_at).getTime() >= weekAgo).length;

    return {
      byCity,
      days,
      avgFee,
      activeMembers,
      last7,
      frequency: countBy(data.members, "workout_frequency"),
      spend: countBy(data.members, "monthly_spend"),
    };
  }, [data, cities, all, loadedAt]);

  const today = dayKey(new Date(loadedAt));

  if (auth === "checking") {
    return <div className="admin admin-center"><p>Loading…</p></div>;
  }

  if (auth === "out") {
    return (
      <div className="admin admin-center">
        <form className="admin-login" onSubmit={login}>
          <h1>JB Fitnet admin</h1>
          <div className="field">
            <label htmlFor="admin-password">Password</label>
            <input id="admin-password" name="password" type="password" required autoComplete="current-password" autoFocus />
          </div>
          {error && <p className="form-error" role="alert">{error}</p>}
          <button type="submit" className="btn btn-primary btn-block">Sign in</button>
        </form>
      </div>
    );
  }

  const cols = columns[list];
  const maxDay = Math.max(1, ...report.days.map((d) => d.members + d.gyms));
  const maxCity = Math.max(1, ...report.byCity.map((c) => c.members + c.gyms));

  const items: { key: Tab; label: string; icon: React.ReactNode; count?: number }[] = [
    { key: "reports", label: "Dashboard", icon: <Icon d="M3 3h7v9H3zM14 3h7v5h-7zM14 12h7v9h-7zM3 16h7v5H3z" /> },
    { key: "members", label: "Members", count: data.members.length, icon: <Icon d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /> },
    { key: "gyms", label: "Gyms", count: data.gyms.length, icon: <Icon d="M6.5 6.5v11M17.5 6.5v11M3 9v6M21 9v6M6.5 12h11" /> },
  ];
  const title = items.find((i) => i.key === tab)?.label ?? "";

  return (
    <div className="admin admin-shell" data-sidebar={sidebarOpen ? "open" : "collapsed"}>
      <div className={mobileNav ? "admin-side-backdrop open" : "admin-side-backdrop"} onClick={() => setMobileNav(false)} aria-hidden="true" />

      <aside className={mobileNav ? "admin-side mobile-open" : "admin-side"} aria-label="Admin navigation">
        <div className="admin-side-head">
          <Image src="/jb-mark.png" alt="" width={32} height={32} />
          <div className="admin-side-text">
            <strong>JB Fitnet</strong>
            <span>Waitlist admin</span>
          </div>
        </div>

        <nav className="admin-side-nav">
          <span className="admin-side-label">Waitlist</span>
          {items.map((item) => (
            <button
              key={item.key}
              type="button"
              title={item.label}
              aria-current={tab === item.key ? "page" : undefined}
              onClick={() => {
                setTab(item.key);
                setMobileNav(false);
              }}
            >
              {item.icon}
              <span className="admin-side-text">{item.label}</span>
              {item.count != null && <span className="admin-side-count">{item.count}</span>}
            </button>
          ))}
        </nav>

        <div className="admin-side-foot">
          <Link href="/" target="_blank" title="View site">
            <Icon d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <span className="admin-side-text">View site</span>
          </Link>
          <button type="button" title="Sign out" onClick={logout}>
            <Icon d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
            <span className="admin-side-text">Sign out</span>
          </button>
        </div>
      </aside>

      <div className="admin-content">
        <header className="admin-top">
          <button type="button" className="admin-icon-btn" aria-label="Toggle sidebar" title="Toggle sidebar (Ctrl/⌘ B)" onClick={toggleSidebar}>
            <Icon d="M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM9 3v18" />
          </button>
          <span className="admin-top-sep" aria-hidden="true" />
          <h1>{title}</h1>
          <button type="button" className="admin-btn" onClick={load} disabled={loading}>
            {loading ? "Refreshing…" : "Refresh"}
          </button>
        </header>

      <main className="admin-main">
        {error && <p className="form-error" role="alert">{error}</p>}

        {tab === "reports" && (
          <div className="admin-stats">
            <div><span>Members waiting</span><strong>{data.members.length}</strong></div>
            <div><span>Gyms waiting</span><strong>{data.gyms.length}</strong></div>
            <div><span>Cities</span><strong>{cities.length}</strong></div>
            <div><span>Sign-ups, last 7 days</span><strong>{report.last7}</strong></div>
          </div>
        )}

        {tab !== "reports" ? (
          <>
            <div className="admin-filters">
              <div className="field admin-search">
                <label htmlFor="admin-q">Search</label>
                <input id="admin-q" type="search" placeholder="Name, mobile, email, city…" value={query} onChange={(e) => setQuery(e.target.value)} />
              </div>
              <div className="field">
                <label htmlFor="admin-city">City</label>
                <select id="admin-city" value={city} onChange={(e) => setCity(e.target.value)}>
                  <option value="">All cities</option>
                  {cities.map((c) => <option key={c} value={c}>{titleCase(c)}</option>)}
                </select>
              </div>
              {tab === "members" && (
                <div className="field">
                  <label htmlFor="admin-freq">Trains</label>
                  <select id="admin-freq" value={frequency} onChange={(e) => setFrequency(e.target.value)}>
                    <option value="">Any</option>
                    {frequencies.map((f) => <option key={f}>{f}</option>)}
                  </select>
                </div>
              )}
              <div className="field">
                <label htmlFor="admin-from">Joined from</label>
                <input id="admin-from" type="date" value={from} max={to || today} onChange={(e) => setFrom(e.target.value)} />
              </div>
              <div className="field">
                <label htmlFor="admin-to">Joined to</label>
                <input id="admin-to" type="date" value={to} min={from} max={today} onChange={(e) => setTo(e.target.value)} />
              </div>
            </div>

            <div className="admin-toolbar">
              <span>
                Showing {filtered.length} of {data[list].length}
                {hasFilters && <button type="button" className="admin-link" onClick={clearFilters}>Clear filters</button>}
              </span>
              <button
                type="button"
                className="admin-btn admin-btn-primary"
                disabled={!filtered.length}
                onClick={() => downloadCsv(`jbfitnet-${list}-${today}.csv`, cols.map((c) => c.label), filtered.map((r) => cols.map((c) => cell(r, c))))}
              >
                Download CSV ({filtered.length})
              </button>
            </div>

            <div className="admin-table">
              <table>
                <thead>
                  <tr><th scope="col" className="admin-viewcol"><span className="sr-only">View</span></th>{cols.map((c) => <th key={c.key} scope="col">{c.label}</th>)}</tr>
                </thead>
                <tbody>
                  {filtered.map((row) => (
                    <tr key={row.id}>
                      <td className="admin-viewcol">
                        <button type="button" className="admin-icon-btn" aria-label={`View ${cell(row, cols[1])}`} title="View details" onClick={() => setViewing({ row, kind: list })}>
                          <Icon d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                        </button>
                      </td>
                      {cols.map((c) => <td key={c.key}>{cell(row, c) || <span className="admin-empty">–</span>}</td>)}
                    </tr>
                  ))}
                  {!filtered.length && (
                    <tr>
                      <td colSpan={cols.length + 1} className="admin-none">
                        {data[list].length ? "Nothing matches these filters." : "No data yet."}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        ) : !all.length ? (
          <div className="admin-nodata">
            <strong>No data yet</strong>
            <p>Reports appear here once people start joining the waitlist.</p>
          </div>
        ) : (
          <div className="admin-reports">
            <section>
              <div className="admin-toolbar">
                <h2>Sign-ups by city</h2>
                <button
                  type="button"
                  className="admin-btn admin-btn-primary"
                  disabled={!report.byCity.length}
                  onClick={() => downloadCsv(`jbfitnet-cities-${today}.csv`, ["City", "Members", "Gyms", "Total"], report.byCity.map((c) => [c.city, String(c.members), String(c.gyms), String(c.members + c.gyms)]))}
                >
                  Download CSV
                </button>
              </div>
              <div className="admin-table">
                <table>
                  <thead><tr><th scope="col">City</th><th scope="col">Members</th><th scope="col">Gyms</th><th scope="col" className="admin-barcol">Total</th></tr></thead>
                  <tbody>
                    {report.byCity.map((c) => (
                      <tr key={c.city}>
                        <td>{c.city}</td><td>{c.members}</td><td>{c.gyms}</td>
                        <td><Bar value={c.members + c.gyms} max={maxCity} /></td>
                      </tr>
                    ))}
                    {!report.byCity.length && <tr><td colSpan={4} className="admin-none">No data yet.</td></tr>}
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <div className="admin-toolbar">
                <h2>Sign-ups per day, last 14 days</h2>
                <button
                  type="button"
                  className="admin-btn admin-btn-primary"
                  onClick={() => downloadCsv(`jbfitnet-daily-${today}.csv`, ["Date", "Members", "Gyms", "Total"], report.days.map((d) => [d.key, String(d.members), String(d.gyms), String(d.members + d.gyms)]))}
                >
                  Download CSV
                </button>
              </div>
              <div className="admin-table">
                <table>
                  <thead><tr><th scope="col">Date</th><th scope="col">Members</th><th scope="col">Gyms</th><th scope="col" className="admin-barcol">Total</th></tr></thead>
                  <tbody>
                    {report.days.some((d) => d.members + d.gyms > 0) ? (
                      report.days.map((d) => (
                        <tr key={d.key}>
                          <td>{d.label}</td><td>{d.members}</td><td>{d.gyms}</td>
                          <td><Bar value={d.members + d.gyms} max={maxDay} /></td>
                        </tr>
                      ))
                    ) : (
                      <tr><td colSpan={4} className="admin-none">No sign-ups in the last 14 days.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>

            <div className="admin-pair">
              <Breakdown title="How often members train" rows={report.frequency} total={data.members.length} />
              <Breakdown title="What members pay now" rows={report.spend} total={data.members.length} />
            </div>

            <section>
              <h2>Gym partners</h2>
              <div className="admin-stats">
                <div><span>Average monthly fee</span><strong>{report.avgFee == null ? "–" : rupees(report.avgFee)}</strong></div>
                <div><span>Average day rate</span><strong>{report.avgFee == null ? "–" : rupees(report.avgFee / 30)}</strong></div>
                <div><span>Active members reported</span><strong>{report.activeMembers.toLocaleString("en-IN")}</strong></div>
              </div>
            </section>
          </div>
        )}
      </main>
      </div>

      {/* Details panel for one sign-up */}
      <div className={viewing ? "admin-sheet-backdrop open" : "admin-sheet-backdrop"} onClick={() => setViewing(null)} aria-hidden="true" />
      <aside className={viewing ? "admin-sheet open" : "admin-sheet"} inert={!viewing} aria-label="Sign-up details">
        {viewing && (
          <>
            <div className="admin-sheet-head">
              <div>
                <span>{viewing.kind === "members" ? "Member" : "Gym partner"} · joined {date(viewing.row.created_at)}</span>
                <h2>{cell(viewing.row, columns[viewing.kind][1])}</h2>
              </div>
              <button type="button" className="admin-icon-btn" aria-label="Close details" onClick={() => setViewing(null)}>
                <Icon d="M6 6l12 12M18 6L6 18" />
              </button>
            </div>
            <dl className="admin-sheet-list">
              {columns[viewing.kind].slice(1).map((c) => {
                const value = cell(viewing.row, c);
                return (
                  <div key={c.key}>
                    <dt>{c.label}</dt>
                    <dd>
                      {!value ? (
                        <span className="admin-empty">Not given</span>
                      ) : c.key === "phone" ? (
                        <a href={`tel:${value}`}>{value}</a>
                      ) : c.key === "email" ? (
                        <a href={`mailto:${value}`}>{value}</a>
                      ) : (
                        value
                      )}
                    </dd>
                  </div>
                );
              })}
            </dl>
          </>
        )}
      </aside>
    </div>
  );
}

function Icon({ d }: { d: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

function Bar({ value, max }: { value: number; max: number }) {
  return (
    <span className="admin-bar-cell">
      <span className="admin-bar-num">{value}</span>
      <span className="admin-bar-track"><span style={{ width: `${(value / max) * 100}%` }} /></span>
    </span>
  );
}

function Breakdown({ title, rows, total }: { title: string; rows: [string, number][]; total: number }) {
  const max = Math.max(1, ...rows.map(([, n]) => n));
  return (
    <section>
      <h2>{title}</h2>
      <div className="admin-table">
        <table>
          <tbody>
            {rows.map(([label, n]) => (
              <tr key={label}>
                <td>{label}</td>
                <td>{total ? Math.round((n / total) * 100) : 0}%</td>
                <td className="admin-barcol"><Bar value={n} max={max} /></td>
              </tr>
            ))}
            {!rows.length && <tr><td className="admin-none">No data yet.</td></tr>}
          </tbody>
        </table>
      </div>
    </section>
  );
}
