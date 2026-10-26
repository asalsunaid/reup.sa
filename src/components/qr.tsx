import QRCode from "qrcode";

/** Real, scannable QR rendered as SVG at build time. */
export function QR({ value, size = 76, className = "" }: { value: string; size?: number; className?: string }) {
  const { modules } = QRCode.create(value, { errorCorrectionLevel: "M" });
  const n = modules.size;
  const cells: string[] = [];
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      if (modules.data[y * n + x]) cells.push(`M${x} ${y}h1v1h-1z`);
    }
  }
  return (
    <svg
      viewBox={`-2 -2 ${n + 4} ${n + 4}`}
      width={size}
      height={size}
      className={className}
      shapeRendering="crispEdges"
      aria-hidden
    >
      <rect x="-2" y="-2" width={n + 4} height={n + 4} fill="#fff" />
      <path d={cells.join("")} fill="#201751" />
    </svg>
  );
}
