import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

const languages = [
  { code: "en", flag: "🇬🇧" },
  { code: "fr", flag: "🇫🇷" },
  { code: "pt", flag: "🇧🇷" },
  { code: "es", flag: "🇪🇸" },
];

const monoStyle = {
  fontFamily: "'IBM Plex Mono', monospace",
  letterSpacing: "0.1em",
  textTransform: "uppercase",
};

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const dropdownRef = useRef(null);
  const langRef = useRef(null);
  const { t, i18n } = useTranslation();

  const currentLang =
    languages.find((l) => l.code === i18n.language) || languages[0];

  const versions = [
    { label: t("industrial.nav.web"), href: "/" },
    // { label: t("industrial.nav.dentist"), href: "#" },
  ];

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setDropdownOpen(false);
      if (langRef.current && !langRef.current.contains(e.target))
        setLangOpen(false);
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
        zIndex: 5,
        background: "#1A1A18",
        borderBottom: "2px solid #C7521A",
      }}
    >
      {/* ── Main bar ── */}
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
              ...monoStyle,
              fontSize: "0.7rem",
              color: "#C7521A",
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
          {/* Work / CAD */}
          {[
            { label: t("industrial.nav.work"), anchor: "work" },
            { label: t("industrial.nav.cad"), anchor: "cad" },
          ].map(({ label, anchor }) => (
            <li key={anchor}>
              <a
                href={`#${anchor}`}
                style={{
                  ...monoStyle,
                  fontSize: "0.7rem",
                  color: "rgba(255,255,255,0.5)",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.target.style.color = "#C7521A")}
                onMouseLeave={(e) =>
                  (e.target.style.color = "rgba(255,255,255,0.5)")
                }
              >
                {label}
              </a>
            </li>
          ))}

          {/* Versions dropdown */}
          <li className="relative mt-1.5" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-1.5"
              style={{
                ...monoStyle,
                fontSize: "0.7rem",
                color: "rgba(255,255,255,0.5)",
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
              {t("industrial.nav.versions")}
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
                    background: "#1A1A18",
                    border: "1px solid #C7521A",
                    listStyle: "none",
                    minWidth: "180px",
                  }}
                >
                  {versions.map((v) => (
                    <li key={v.label}>
                      <a
                        href={v.href}
                        onClick={() => setDropdownOpen(false)}
                        style={{
                          display: "block",
                          padding: "0.75rem 1.25rem",
                          ...monoStyle,
                          fontSize: "0.68rem",
                          color: "rgba(255,255,255,0.5)",
                          textDecoration: "none",
                          transition: "background 0.2s, color 0.2s",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "#C7521A";
                          e.currentTarget.style.color = "#FAFAF8";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "transparent";
                          e.currentTarget.style.color = "rgba(255,255,255,0.5)";
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

          {/* ── Language dropdown ── */}
          <li className="relative mt-1.5" ref={langRef}>
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5"
              style={{
                ...monoStyle,
                fontSize: "0.7rem",
                color: "rgba(255,255,255,0.5)",
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
              <span style={{ fontSize: "0.9rem", lineHeight: 1 }}>
                {currentLang.flag}
              </span>
              <span>{currentLang.code}</span>
              <motion.span
                animate={{ rotate: langOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                style={{ fontSize: "8px" }}
              >
                ▼
              </motion.span>
            </button>

            <AnimatePresence>
              {langOpen && (
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
                    background: "#1A1A18",
                    border: "1px solid #C7521A",
                    listStyle: "none",
                    minWidth: "150px",
                  }}
                >
                  {languages.map((lang) => {
                    const isActive = i18n.language === lang.code;
                    return (
                      <li key={lang.code}>
                        <button
                          onClick={() => {
                            i18n.changeLanguage(lang.code);
                            setLangOpen(false);
                          }}
                          style={{
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                            gap: "0.6rem",
                            padding: "0.65rem 1.25rem",
                            ...monoStyle,
                            fontSize: "0.68rem",
                            color: isActive
                              ? "#C7521A"
                              : "rgba(255,255,255,0.5)",
                            background: isActive
                              ? "rgba(199,82,26,0.12)"
                              : "transparent",
                            border: "none",
                            cursor: "none",
                            textAlign: "left",
                            transition: "background 0.2s, color 0.2s",
                          }}
                          onMouseEnter={(e) => {
                            if (!isActive) {
                              e.currentTarget.style.background = "#C7521A";
                              e.currentTarget.style.color = "#FAFAF8";
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!isActive) {
                              e.currentTarget.style.background = "transparent";
                              e.currentTarget.style.color =
                                "rgba(255,255,255,0.5)";
                            }
                          }}
                        >
                          <span style={{ fontSize: "0.9rem", lineHeight: 1 }}>
                            {lang.flag}
                          </span>
                          <span>{lang.code.toUpperCase()}</span>
                          {isActive && (
                            <span
                              style={{ marginLeft: "auto", color: "#C7521A" }}
                            >
                              ◆
                            </span>
                          )}
                        </button>
                      </li>
                    );
                  })}
                </motion.ul>
              )}
            </AnimatePresence>
          </li>
        </ul>

        {/* Desktop status */}
        <div
          className="hidden md:block"
          style={{
            ...monoStyle,
            fontSize: "0.65rem",
            color: "rgba(255,255,255,0.35)",
          }}
        >
          REV 2026.02 —{" "}
          <span style={{ color: "#C7521A" }}>
            {t("industrial.nav.open_to_work")}
          </span>
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

      {/* ── Mobile menu ── */}
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
              {/* Work / CAD */}
              {[
                { label: t("industrial.nav.work"), anchor: "work" },
                { label: t("industrial.nav.cad"), anchor: "cad" },
              ].map(({ label, anchor }) => (
                <li key={anchor}>
                  <a
                    href={`#${anchor}`}
                    onClick={() => setOpen(false)}
                    style={{
                      ...monoStyle,
                      fontSize: "0.85rem",
                      color: "rgba(255,255,255,0.5)",
                      textDecoration: "none",
                    }}
                  >
                    {label}
                  </a>
                </li>
              ))}

              {/* Mobile versions */}
              <li>
                <p
                  style={{
                    ...monoStyle,
                    fontSize: "0.62rem",
                    color: "#C7521A",
                    marginBottom: "0.75rem",
                  }}
                >
                  {t("industrial.nav.other_versions")}
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
                          ...monoStyle,
                          fontSize: "0.8rem",
                          color: "rgba(255,255,255,0.4)",
                          textDecoration: "none",
                        }}
                      >
                        {v.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>

              {/* ── Mobile language selector ── */}
              <li>
                <p
                  style={{
                    ...monoStyle,
                    fontSize: "0.62rem",
                    color: "#C7521A",
                    marginBottom: "0.75rem",
                  }}
                >
                  {t("industrial.nav.language")}
                </p>
                <div
                  style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}
                >
                  {languages.map((lang) => {
                    const isActive = i18n.language === lang.code;
                    return (
                      <button
                        key={lang.code}
                        onClick={() => {
                          i18n.changeLanguage(lang.code);
                          setOpen(false);
                        }}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.4rem",
                          padding: "0.3rem 0.7rem",
                          ...monoStyle,
                          fontSize: "0.65rem",
                          border: isActive
                            ? "1px solid #C7521A"
                            : "1px solid rgba(255,255,255,0.15)",
                          color: isActive ? "#C7521A" : "rgba(255,255,255,0.4)",
                          background: isActive
                            ? "rgba(199,82,26,0.12)"
                            : "transparent",
                          cursor: "none",
                          transition: "all 0.2s",
                        }}
                      >
                        <span style={{ fontSize: "0.85rem" }}>{lang.flag}</span>
                        <span>{lang.code.toUpperCase()}</span>
                      </button>
                    );
                  })}
                </div>
              </li>
            </ul>

            <div
              style={{
                padding: "0 2rem 1.5rem",
                ...monoStyle,
                fontSize: "0.65rem",
                color: "rgba(255,255,255,0.25)",
              }}
            >
              REV 2026.02 —{" "}
              <span style={{ color: "#C7521A" }}>
                {t("industrial.nav.open_to_work")}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
