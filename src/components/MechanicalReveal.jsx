// src/components/MechanicalReveal.jsx
import { useEffect, useRef, useState } from "react";

// ─── Dimensions partagées ─────────────────────────────────────────
const X = 20; // x de départ du papier
const Y = 20; // y de départ du papier
const W = 600; // largeur du papier = largeur de l'image
const H = 300; // hauteur du papier = hauteur de l'image

// ─── Gear ────────────────────────────────────────────────────────
function Gear({
  size,
  teeth,
  x,
  y,
  speed,
  direction = 1,
  color = "#C7521A",
  initialAngle = 0,
}) {
  const angleRef = useRef(initialAngle);
  const rafRef = useRef(null);
  const groupRef = useRef(null);

  useEffect(() => {
    let last = null;
    const animate = (ts) => {
      if (!last) last = ts;
      const dt = ts - last;
      last = ts;
      angleRef.current += direction * speed * dt * 0.05;
      if (groupRef.current) {
        groupRef.current.setAttribute(
          "transform",
          `rotate(${angleRef.current}, ${x}, ${y})`
        );
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [x, y, speed, direction]);

  const r = size / 2;
  const innerR = r * 0.65;
  const toothH = r * 0.28;
  const pts = [];
  for (let i = 0; i < teeth; i++) {
    const a0 = (i / teeth) * Math.PI * 2;
    const a1 = ((i + 0.3) / teeth) * Math.PI * 2;
    const a2 = ((i + 0.5) / teeth) * Math.PI * 2;
    const a3 = ((i + 0.8) / teeth) * Math.PI * 2;
    pts.push(`${x + innerR * Math.cos(a0)},${y + innerR * Math.sin(a0)}`);
    pts.push(
      `${x + (r + toothH) * Math.cos(a1)},${y + (r + toothH) * Math.sin(a1)}`
    );
    pts.push(
      `${x + (r + toothH) * Math.cos(a2)},${y + (r + toothH) * Math.sin(a2)}`
    );
    pts.push(`${x + innerR * Math.cos(a3)},${y + innerR * Math.sin(a3)}`);
  }

  return (
    <g ref={groupRef} transform={`rotate(${initialAngle}, ${x}, ${y})`}>
      <polygon points={pts.join(" ")} fill={color} opacity="0.9" />
      <circle cx={x} cy={y} r={innerR * 0.55} fill="#1A1A18" />
      <circle cx={x} cy={y} r={innerR * 0.2} fill={color} opacity="0.6" />
      {[0, 1, 2].map((i) => {
        const a = (i / 3) * Math.PI * 2;
        return (
          <line
            key={i}
            x1={x + innerR * 0.22 * Math.cos(a)}
            y1={y + innerR * 0.22 * Math.sin(a)}
            x2={x + innerR * 0.52 * Math.cos(a)}
            y2={y + innerR * 0.52 * Math.sin(a)}
            stroke={color}
            strokeWidth="1.5"
            opacity="0.5"
          />
        );
      })}
    </g>
  );
}

// ─── InkRoller — même hauteur que l'image ────────────────────────
function InkRoller({ progress }) {
  const x = X + progress * W;
  return (
    <g>
      {/* Bras supérieur */}
      <rect
        x={x - 16}
        y={Y - 20}
        width={32}
        height={24}
        rx="3"
        fill="#2A2A28"
      />
      {/* Rouleau pleine hauteur */}
      <rect
        x={x - 12}
        y={Y}
        width={24}
        height={H}
        rx="2"
        fill="#1A1A18"
        stroke="#C7521A"
        strokeWidth="1"
      />
      <rect
        x={x - 10}
        y={Y}
        width={20}
        height={H}
        rx="1"
        fill={`rgba(199,82,26,${0.12 + progress * 0.1})`}
      />
      {/* Reflet */}
      <rect
        x={x - 6}
        y={Y + 4}
        width={4}
        height={H - 8}
        rx="1"
        fill="rgba(255,255,255,0.07)"
      />
      {/* Bras inférieur */}
      <rect
        x={x - 16}
        y={Y + H - 4}
        width={32}
        height={24}
        rx="3"
        fill="#2A2A28"
      />
    </g>
  );
}

// ─── Paper — dimensions alignées ─────────────────────────────────
function Paper() {
  return (
    <g>
      {/* Ombre */}
      <rect
        x={X + 2}
        y={Y + 2}
        width={W}
        height={H}
        rx="1"
        fill="rgba(0,0,0,0.2)"
      />
      {/* Feuille */}
      <rect x={X} y={Y} width={W} height={H} fill="#f1f1f2" rx="1" />
      {/* Grille horizontale */}
      {Array.from({ length: 16 }).map((_, i) => (
        <line
          key={`h${i}`}
          x1={X}
          y1={Y + i * 20}
          x2={X + W}
          y2={Y + i * 20}
          stroke="#ececec"
          strokeWidth="0.5"
        />
      ))}
      {/* Grille verticale */}
      {Array.from({ length: 31 }).map((_, i) => (
        <line
          key={`v${i}`}
          x1={X + i * 20}
          y1={Y}
          x2={X + i * 20}
          y2={Y + H}
          stroke="rgba(199,82,26,0.05)"
          strokeWidth="0.5"
        />
      ))}
      {/* Bordure */}
      <rect
        x={X}
        y={Y}
        width={W}
        height={H}
        fill="none"
        stroke="rgba(26,26,24,0.1)"
        strokeWidth="1"
        rx="1"
      />
    </g>
  );
}

// ─── PrintedContent — aligné sur X/Y/W/H ─────────────────────────
function PrintedContent({ progress }) {
  const uid = useRef(`pc-${Math.random().toString(36).slice(2)}`).current;
  return (
    <g>
      <defs>
        <clipPath id={`${uid}-clip`}>
          <rect x={X} y={Y} width={W * progress} height={H} />
        </clipPath>
        <filter id={`${uid}-blur`}>
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
        <filter id={`${uid}-print`}>
          <feColorMatrix type="saturate" values="0.1" />
          <feComponentTransfer>
            <feFuncR type="linear" slope="0.9" />
            <feFuncG type="linear" slope="0.9" />
            <feFuncB type="linear" slope="0.9" />
          </feComponentTransfer>
        </filter>
      </defs>

      <g clipPath={`url(#${uid}-clip)`}>
        <g filter={`url(#${uid}-blur)`}>
          <image
            href="/images/profil_drawing.webp"
            x={X}
            y={Y}
            width={W}
            height={H}
            preserveAspectRatio="xMidYMid meet"
            filter={`url(#${uid}-print)`}
          />
        </g>
      </g>

      {/* Ligne d'encre */}
      {progress > 0.01 && progress < 0.99 && (
        <line
          x1={X + W * progress}
          y1={Y}
          x2={X + W * progress}
          y2={Y + H}
          stroke="#C7521A"
          strokeWidth="1.5"
          opacity={0.5}
        />
      )}

      {/* Corner marks haut-gauche */}
      {progress > 0.03 && (
        <>
          <line
            x1={X + 6}
            y1={Y + 6}
            x2={X + 20}
            y2={Y + 6}
            stroke="#C7521A"
            strokeWidth="1.5"
            opacity={Math.min(progress * 8, 1)}
          />
          <line
            x1={X + 6}
            y1={Y + 6}
            x2={X + 6}
            y2={Y + 20}
            stroke="#C7521A"
            strokeWidth="1.5"
            opacity={Math.min(progress * 8, 1)}
          />
        </>
      )}

      {/* Corner marks bas-droite */}
      {progress > 0.95 && (
        <>
          <line
            x1={X + W - 20}
            y1={Y + H - 6}
            x2={X + W - 6}
            y2={Y + H - 6}
            stroke="#C7521A"
            strokeWidth="1.5"
            opacity={(progress - 0.95) * 20}
          />
          <line
            x1={X + W - 6}
            y1={Y + H - 20}
            x2={X + W - 6}
            y2={Y + H - 6}
            stroke="#C7521A"
            strokeWidth="1.5"
            opacity={(progress - 0.95) * 20}
          />
        </>
      )}
    </g>
  );
}

// ─── Main ─────────────────────────────────────────────────────────
export default function MechanicalReveal() {
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

  const gs = running ? 1 : 0.12;

  const VW = X + W + X; // 640
  const VH = Y + H + 100; // 420
  const RAIL_Y_TOP = Y - 12;
  const RAIL_Y_BOT = Y + H + 2;
  const GEAR_Y = Y + H + 58;

  return (
    <div style={{ background: "transparent", width: "100%" }}>
      <svg
        viewBox={`0 0 ${VW} ${VH}`}
        style={{ width: "100%", overflow: "visible" }}
      >
        {/* Frame */}
        <rect
          x={4}
          y={4}
          width={VW - 8}
          height={VH - 8}
          rx="4"
          fill="#111110"
          stroke="rgba(199,82,26,0.18)"
          strokeWidth="1"
        />

        {/* Rail supérieur */}
        <rect
          x={X - 4}
          y={RAIL_Y_TOP}
          width={W + 8}
          height={12}
          rx="2"
          fill="#2A2A28"
        />
        <rect
          x={X - 4}
          y={RAIL_Y_TOP}
          width={W + 8}
          height={4}
          rx="2"
          fill="#C7521A"
          opacity="0.5"
        />

        {/* Rail inférieur */}
        <rect
          x={X - 4}
          y={RAIL_Y_BOT}
          width={W + 8}
          height={12}
          rx="2"
          fill="#2A2A28"
        />

        {/* Contenu */}
        <Paper />
        <PrintedContent progress={progress} />
        {running && <InkRoller progress={progress} />}

        {/* Engrenages gauche */}
        <Gear
          size={72}
          teeth={12}
          x={55}
          y={GEAR_Y}
          speed={gs * 1.8}
          direction={1}
          color="#C7521A"
          initialAngle={0}
        />
        <Gear
          size={44}
          teeth={8}
          x={97}
          y={GEAR_Y - 28}
          speed={gs * 3.0}
          direction={-1}
          color="#5A5A54"
          initialAngle={15}
        />
        <Gear
          size={28}
          teeth={6}
          x={117}
          y={GEAR_Y - 52}
          speed={gs * 4.7}
          direction={1}
          color="#C7521A"
          initialAngle={5}
        />

        {/* Engrenages droite */}
        <Gear
          size={72}
          teeth={12}
          x={VW - 55}
          y={GEAR_Y}
          speed={gs * 1.8}
          direction={-1}
          color="#C7521A"
          initialAngle={8}
        />
        <Gear
          size={44}
          teeth={8}
          x={VW - 97}
          y={GEAR_Y - 28}
          speed={gs * 3.0}
          direction={1}
          color="#5A5A54"
          initialAngle={22}
        />
        <Gear
          size={28}
          teeth={6}
          x={VW - 117}
          y={GEAR_Y - 52}
          speed={gs * 4.7}
          direction={-1}
          color="#C7521A"
          initialAngle={12}
        />

        {/* Engrenages centre */}
        <Gear
          size={36}
          teeth={8}
          x={VW / 2}
          y={GEAR_Y}
          speed={gs * 2.2}
          direction={1}
          color="#5A5A54"
          initialAngle={0}
        />
        <Gear
          size={22}
          teeth={6}
          x={VW / 2 + 27}
          y={GEAR_Y - 14}
          speed={gs * 3.6}
          direction={-1}
          color="#C7521A"
          initialAngle={30}
        />
        <Gear
          size={22}
          teeth={6}
          x={VW / 2 - 27}
          y={GEAR_Y - 14}
          speed={gs * 3.6}
          direction={-1}
          color="#C7521A"
          initialAngle={10}
        />

        {/* Progress bar */}
        <rect
          x={X + 40}
          y={RAIL_Y_BOT + 16}
          width={W - 80}
          height={2}
          fill="rgba(255,255,255,0.05)"
        />
        <rect
          x={X + 40}
          y={RAIL_Y_BOT + 16}
          width={(W - 80) * progress}
          height={2}
          fill="#C7521A"
          opacity="0.8"
        />

        {/* Label */}
        <text
          x={X}
          y={VH - 6}
          fontFamily="'IBM Plex Mono', monospace"
          fontSize="7.5"
          fill="rgba(255,255,255,0.12)"
          letterSpacing="0.1em"
        >
          REF-PRINT-001 · MECHANICAL REVEAL SYSTEM · 2026.02
        </text>
      </svg>

      {/* Controls */}
      <div
        style={{
          display: "flex",
          gap: "1rem",
          marginTop: "1rem",
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
              fontSize: "0.68rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              background: running ? "transparent" : "#C7521A",
              color: running ? "rgba(255,255,255,0.3)" : "white",
              border: running ? "1px solid rgba(199,82,26,0.3)" : "none",
              padding: "0.6rem 1.5rem",
              cursor: "none",
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
                fontSize: "0.68rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                background: "transparent",
                color: "rgba(26,26,24,0.4)",
                border: "1px solid rgba(26,26,24,0.15)",
                padding: "0.6rem 1.5rem",
                cursor: "none",
              }}
            >
              ↺ Reprint
            </button>
            <span
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "0.62rem",
                color: "#C7521A",
              }}
            >
              ✓ Done
            </span>
          </>
        )}
      </div>

      {/* Status */}
      <p
        style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: "0.55rem",
          color: "rgba(26,26,24,0.25)",
          textAlign: "center",
          marginTop: "0.5rem",
          letterSpacing: "0.08em",
        }}
      >
        INK: {Math.round(progress * 100)}% · GEARS:{" "}
        {running ? "ENGAGED" : "STANDBY"}
      </p>
    </div>
  );
}
