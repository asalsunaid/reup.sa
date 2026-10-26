import Image from "next/image";

// The REUP wordmark ships as a padded 530x471 PNG; this crops to the glyph box (x 124-396, y 184-248).
const SRC = { url: "https://reup.sa/images/REUP.png", w: 530, h: 471, x: 124, y: 184, boxW: 273, boxH: 65 };

export function Logo({
  height = 22,
  className = "",
  preload = false,
  unoptimized = false,
}: {
  height?: number;
  className?: string;
  preload?: boolean;
  unoptimized?: boolean;
}) {
  const s = height / SRC.boxH;
  const w = Math.round(SRC.w * s);
  const h = Math.round(SRC.h * s);
  return (
    <span className={`relative block shrink-0 overflow-hidden ${className}`} style={{ width: SRC.boxW * s, height }} dir="ltr">
      <Image
        src={SRC.url}
        unoptimized={unoptimized}
        alt="REUP"
        width={w}
        height={h}
        preload={preload}
        className="absolute max-w-none select-none"
        style={{ width: w, height: h, left: -SRC.x * s, top: -SRC.y * s }}
        draggable={false}
      />
    </span>
  );
}
