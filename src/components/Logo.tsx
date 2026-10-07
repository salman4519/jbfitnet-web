import Image from "next/image";

export default function Logo({ width = 75, priority = false }: { width?: number; priority?: boolean }) {
  const height = Math.round((width * 704) / 1196);
  return <Image src="/logo-light.png" alt="JB Fitnet" width={width} height={height} priority={priority} />;
}
