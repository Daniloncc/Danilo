import { useEffect, useRef, useState } from "react";

export default function MechanicalRevealMobile() {
  const [progress, setProgress] = useState(0);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const rafRef = useRef(null);
  const startRef = useRef(null);
  const DURATION = 3400;

  const start = () => {
    if (running) return;
    setProgress(0);
    setDone(false);
    setRunning(true);
    startRef.current = null;
    const animate = (ts) => {
      if (!startRef.current) startRef.current = ts;
      const p = Math.min((ts - startRef.current) / DURATION, 1);
      const eased = p < 0.5 ? 2 * p * p : -1 + (4 - 2 * p) * p;
      setProgress(eased);
      if (p < 1) rafRef.current = requestAnimationFrame(animate);
      else {
        setRunning(false);
        setDone(true);
      }
    };
    rafRef.current = requestAnimationFrame(animate);
  };

  const reset = () => {
    cancelAnimationFrame(rafRef.current);
    setProgress(0);
    setRunning(false);
    setDone(false);
  };

  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  return (
    <div style={{ width: "100%", background: "transparent" }}>
      <svg viewBox="0 0 400 220" style={{ width: "100%" }}>
        {/* Rail top */}
        <rect x={0} y={0} width={400} height={8} fill="#2A2A28" />
        <rect x={0} y={0} width={400} height={3} fill="#C7521A" opacity="0.6" />

        {/* Rail bottom */}
        <rect x={0} y={212} width={400} height={8} fill="#2A2A28" />

        {/* Paper */}
        <rect x={0} y={8} width={400} height={204} fill="#FAFAF8" />

        {/* Grid */}
        {Array.from({ length: 11 }).map((_, i) => (
          <line
            key={`h${i}`}
            x1={0}
            y1={8 + i * 20}
            x2={400}
            y2={8 + i * 20}
            stroke="rgba(199,82,26,0.05)"
            strokeWidth="0.5"
          />
        ))}
        {Array.from({ length: 21 }).map((_, i) => (
          <line
            key={`v${i}`}
            x1={i * 20}
            y1={8}
            x2={i * 20}
            y2={212}
            stroke="rgba(199,82,26,0.05)"
            strokeWidth="0.5"
          />
        ))}

        <defs>
          <clipPath id="mob-clip">
            <rect x={0} y={8} width={400 * progress} height={204} />
          </clipPath>
          <filter id="mob-blur">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.85"
              numOctaves="4"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={Math.max(0, (1 - progress) * 8)}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
          <filter id="mob-print">
            <feColorMatrix type="saturate" values="0.1" />
          </filter>
        </defs>

        {/* Image révélée */}
        <g clipPath="url(#mob-clip)">
          <g filter="url(#mob-blur)">
            <image
              href="/images/profil_drawing.png"
              x={0}
              y={8}
              width={400}
              height={204}
              preserveAspectRatio="xMidYMid meet"
              filter="url(#mob-print)"
            />
          </g>
        </g>

        {/* Rouleau */}
        {running && (
          <g>
            <rect
              x={400 * progress - 10}
              y={0}
              width={20}
              height={220}
              rx="2"
              fill="#1A1A18"
              stroke="#C7521A"
              strokeWidth="1"
              opacity="0.9"
            />
            <rect
              x={400 * progress - 8}
              y={4}
              width={4}
              height={212}
              rx="1"
              fill="rgba(255,255,255,0.06)"
            />
            {/* Ligne encre */}
            <line
              x1={400 * progress}
              y1={8}
              x2={400 * progress}
              y2={212}
              stroke="#C7521A"
              strokeWidth="1"
              opacity="0.5"
            />
          </g>
        )}

        {/* Corner marks */}
        {progress > 0.03 && (
          <>
            <line
              x1={6}
              y1={14}
              x2={18}
              y2={14}
              stroke="#C7521A"
              strokeWidth="1"
              opacity={Math.min(progress * 8, 1)}
            />
            <line
              x1={6}
              y1={14}
              x2={6}
              y2={26}
              stroke="#C7521A"
              strokeWidth="1"
              opacity={Math.min(progress * 8, 1)}
            />
          </>
        )}
      </svg>

      {/* Controls */}
      <div
        style={{
          display: "flex",
          gap: "0.75rem",
          marginTop: "0.75rem",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {!done ? (
          <button
            onClick={start}
            disabled={running}
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "0.65rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              background: running ? "transparent" : "#C7521A",
              color: running ? "rgba(26,26,24,0.3)" : "white",
              border: running ? "1px solid rgba(199,82,26,0.3)" : "none",
              padding: "0.5rem 1.25rem",
            }}
          >
            {running ? "Printing..." : "▶ Print"}
          </button>
        ) : (
          <>
            <button
              onClick={reset}
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "0.65rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                background: "transparent",
                color: "rgba(26,26,24,0.4)",
                border: "1px solid rgba(26,26,24,0.15)",
                padding: "0.5rem 1.25rem",
              }}
            >
              ↺ Reprint
            </button>
            <span
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "0.6rem",
                color: "#C7521A",
              }}
            >
              ✓ Done
            </span>
          </>
        )}
      </div>

      <p
        style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: "0.5rem",
          color: "rgba(26,26,24,0.2)",
          textAlign: "center",
          marginTop: "0.4rem",
          letterSpacing: "0.08em",
        }}
      >
        INK: {Math.round(progress * 100)}% ·{" "}
        {running ? "PRINTING" : done ? "COMPLETE" : "STANDBY"}
      </p>
    </div>
  );
}
