import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Nav ──────────────────────────────────────────────────────────
export default function Nav() {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const versions = [
    { label: "Web Developer", href: "/" },
    { label: "Dentist", href: "#" },
  ];

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: "#1A1A18",
        borderBottom: "2px solid #C7521A",
      }}
    >
      {/* Main bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem 3rem",
        }}
      >
        {/* Logo */}
        <a
          href="#"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            textDecoration: "none",
          }}
        >
          <span
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "0.7rem",
              color: "#C7521A",
              letterSpacing: "0.05em",
              border: "1px solid #C7521A",
              padding: "0.2rem 0.5rem",
            }}
          >
            DC
          </span>
        </a>

        {/* Desktop links */}
        <ul
          className="hidden md:flex ml-12"
          style={{ gap: "2rem", listStyle: "none", alignItems: "center" }}
        >
          {["Work", "CAD"].map((l) => (
            <li key={l}>
              <a
                href={`#${l.toLowerCase()}`}
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: "0.7rem",
                  color: "rgba(255,255,255,0.5)",
                  textDecoration: "none",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.target.style.color = "#C7521A")}
                onMouseLeave={(e) => (e.target.style.color = "#C7521A")}
              >
                {l}
              </a>
            </li>
          ))}

          {/* Desktop dropdown */}
          <li className="relative mt-1.5" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-1.5"
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "0.7rem",
                color: "rgba(255,255,255,0.5)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                background: "none",
                border: "none",
                cursor: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#C7521A")}
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "rgba(255,255,255,0.5)")
              }
            >
              Versions
              <motion.span
                animate={{ rotate: dropdownOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                style={{ fontSize: "8px" }}
              >
                ▼
              </motion.span>
            </button>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.ul
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    position: "absolute",
                    top: "100%",
                    right: 0,
                    marginTop: "0.75rem",
                    background: "#F7F5F0",
                    border: "1px solid #E2DDD6",
                    listStyle: "none",
                    minWidth: "180px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  }}
                >
                  {versions.map((v) => (
                    <li key={v.label}>
                      <a
                        href={v.href}
                        onClick={() => setDropdownOpen(false)}
                        className="block text-[#6B6B6B] hover:bg-[#C7521A] hover:text-[#F7F5F0] transition-colors duration-200"
                        style={{
                          padding: "0.75rem 1.25rem",
                          fontFamily: "'IBM Plex Mono', monospace",
                          fontSize: "0.68rem",
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          textDecoration: "none",
                        }}
                      >
                        {v.label}
                      </a>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </li>
        </ul>

        {/* Desktop status */}
        <div
          className="hidden md:block"
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "0.65rem",
            color: "rgba(255,255,255,0.35)",
            letterSpacing: "0.06em",
          }}
        >
          REV 2026.02 — <span style={{ color: "#C7521A" }}>OPEN TO WORK</span>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Menu"
          style={{ background: "none", border: "none", cursor: "none" }}
        >
          <motion.span
            animate={open ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            style={{
              display: "block",
              width: "24px",
              height: "1px",
              background: "rgba(255,255,255,0.8)",
              transformOrigin: "center",
            }}
          />
          <motion.span
            animate={open ? { opacity: 0 } : { opacity: 1 }}
            style={{
              display: "block",
              width: "24px",
              height: "1px",
              background: "rgba(255,255,255,0.8)",
            }}
          />
          <motion.span
            animate={open ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            style={{
              display: "block",
              width: "24px",
              height: "1px",
              background: "rgba(255,255,255,0.8)",
              transformOrigin: "center",
            }}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden"
            style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
          >
            <ul
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "1.5rem 2rem",
                gap: "1.5rem",
                listStyle: "none",
              }}
            >
              {["Work", "CAD"].map((l) => (
                <li key={l}>
                  <a
                    href={`#${l.toLowerCase()}`}
                    onClick={() => setOpen(false)}
                    style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: "0.85rem",
                      color: "rgba(255,255,255,0.5)",
                      textDecoration: "none",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}
                  >
                    {l}
                  </a>
                </li>
              ))}

              {/* Mobile versions */}
              <li>
                <p
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: "0.62rem",
                    color: "#C7521A",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    marginBottom: "0.75rem",
                  }}
                >
                  Other Versions
                </p>
                <ul
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    listStyle: "none",
                    borderLeft: "1px solid rgba(199,82,26,0.3)",
                    paddingLeft: "1rem",
                  }}
                >
                  {versions.map((v) => (
                    <li key={v.label}>
                      <a
                        href={v.href}
                        onClick={() => setOpen(false)}
                        style={{
                          fontFamily: "'IBM Plex Mono', monospace",
                          fontSize: "0.8rem",
                          color: "rgba(255,255,255,0.4)",
                          textDecoration: "none",
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                        }}
                      >
                        {v.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>

            <div
              style={{
                padding: "0 2rem 1.5rem",
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "0.65rem",
                color: "rgba(255,255,255,0.25)",
                letterSpacing: "0.06em",
              }}
            >
              REV 2026.02 —{" "}
              <span style={{ color: "#C7521A" }}>OPEN TO WORK</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
