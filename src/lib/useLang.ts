"use client";

import { usePathname } from "next/navigation";
import { langFromPath } from "./i18n";

export const useLang = () => langFromPath(usePathname());
