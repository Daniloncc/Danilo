import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Logo from "../components/LogoHome";

const versions = [
  { label: "Industrial Designer", href: "/industrial" },
  // { label: "Dentist ", href: "#" },
];

const languages = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "pt", label: "Português", flag: "🇧🇷" },
  { code: "es", label: "Español", flag: "🇪🇸" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const dropdownRef = useRef(null);
  const langRef = useRef(null);
  const navigate = useNavigate();

  // ── t pour les textes, i18n pour changer la langue ──
  const { t, i18n } = useTranslation();

  const currentLang =
    languages.find((l) => l.code === i18n.language) || languages[0];

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

  const handleNavClick = (anchor) => {
    navigate("/");
    setTimeout(() => {
      const el = document.getElementById(anchor);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  // anchor reste en anglais — c'est l'id HTML de la section, pas du texte affiché
  const navItems = [
    { label: t("nav.work"), anchor: "work" },
    { label: t("nav.about"), anchor: "about" },
    { label: t("nav.contact"), anchor: "contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-3 bg-[#F7F5F0] border-b border-[#E2DDD6]">
      <div className="flex items-center justify-between px-6 md:px-16 py-5">
        <Logo />

        {/* Desktop links */}
        <ul className="hidden md:flex gap-10 list-none items-center">
          {navItems.map((item) => (
            <li key={item.anchor}>
              <button
                onClick={() => handleNavClick(item.anchor)}
                className="text-[11px] uppercase tracking-widest text-[#6B6B6B] hover:text-[#7A9E7E] transition-colors duration-200 bg-transparent border-none cursor-pointer"
              >
                {item.label}
              </button>
            </li>
          ))}

          {/* Versions dropdown */}
          <li className="relative mt-1" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-1.5 text-[11px] uppercase tracking-widest text-[#6B6B6B] hover:text-[#7A9E7E] transition-colors duration-200"
            >
              {t("nav.versions")}
              <motion.span
                animate={{ rotate: dropdownOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="text-[8px]"
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
                  className="absolute top-full right-0 mt-3 bg-[#F7F5F0] border border-[#E2DDD6] list-none min-w-[180px] shadow-sm"
                >
                  {versions.map((v) => (
                    <li key={v.label}>
                      <a
                        href={v.href}
                        onClick={() => setDropdownOpen(false)}
                        className="block px-5 py-3 text-[11px] uppercase tracking-widest text-[#6B6B6B] hover:text-[#7A9E7E] hover:bg-[#EDF2ED] transition-colors duration-200"
                      >
                        {v.label}
                      </a>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </li>

          {/* Language dropdown */}
          <li className="relative mt-1" ref={langRef}>
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-[#6B6B6B] hover:text-[#7A9E7E] transition-colors duration-200"
            >
              <span className="text-base leading-none">{currentLang.flag}</span>
              <span>{currentLang.code}</span>
              <motion.span
                animate={{ rotate: langOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="text-[8px]"
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
                  className="absolute top-full right-0 mt-3 bg-[#F7F5F0] border border-[#E2DDD6] list-none min-w-[160px] shadow-sm"
                >
                  {languages.map((lang) => (
                    <li key={lang.code}>
                      <button
                        onClick={() => {
                          i18n.changeLanguage(lang.code);
                          setLangOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-5 py-3 text-[11px] uppercase tracking-widest transition-colors duration-200"
                        style={{
                          color:
                            i18n.language === lang.code ? "#7A9E7E" : "#6B6B6B",
                          background:
                            i18n.language === lang.code
                              ? "#EDF2ED"
                              : "transparent",
                          border: "none",
                          cursor: "pointer",
                          textAlign: "left",
                        }}
                        onMouseEnter={(e) => {
                          if (i18n.language !== lang.code) {
                            e.currentTarget.style.background = "#EDF2ED";
                            e.currentTarget.style.color = "#7A9E7E";
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (i18n.language !== lang.code) {
                            e.currentTarget.style.background = "transparent";
                            e.currentTarget.style.color = "#6B6B6B";
                          }
                        }}
                      >
                        <span className="text-base leading-none">
                          {lang.flag}
                        </span>
                        <span>{lang.label}</span>
                      </button>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </li>
        </ul>

        {/* Desktop status */}
        <div className="hidden md:flex items-center gap-2 text-[#165323] text-[11px] tracking-wide">
          <span className="w-2 h-2 rounded-full bg-[#165323] animate-pulse" />
          {t("nav.available")}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Menu"
        >
          <motion.span
            animate={open ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            className="block w-6 h-px bg-[#1C1C1E] origin-center"
          />
          <motion.span
            animate={open ? { opacity: 0 } : { opacity: 1 }}
            className="block w-6 h-px bg-[#1C1C1E]"
          />
          <motion.span
            animate={open ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            className="block w-6 h-px bg-[#1C1C1E] origin-center"
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
            className="md:hidden overflow-hidden border-t border-[#E2DDD6]"
          >
            <ul className="flex flex-col px-6 py-6 gap-6 list-none">
              {navItems.map((item) => (
                <li key={item.anchor}>
                  <button
                    onClick={() => {
                      handleNavClick(item.anchor);
                      setOpen(false);
                    }}
                    className="text-[13px] uppercase tracking-widest text-[#6B6B6B] hover:text-[#7A9E7E] transition-colors duration-200 bg-transparent border-none cursor-pointer"
                  >
                    {item.label}
                  </button>
                </li>
              ))}

              {/* Mobile versions */}
              <li>
                <p className="text-[10px] uppercase tracking-widest text-[#C0BAB0] mb-3">
                  {t("nav.other_versions")}
                </p>
                <ul className="flex flex-col gap-4 list-none border-l border-[#E2DDD6] pl-4">
                  {versions.map((v) => (
                    <li key={v.label}>
                      <a
                        href={v.href}
                        onClick={() => setOpen(false)}
                        className="text-[13px] uppercase tracking-widest text-[#6B6B6B] hover:text-[#7A9E7E] transition-colors duration-200"
                      >
                        {v.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>

              {/* Mobile language selector */}
              <li>
                <p className="text-[10px] uppercase tracking-widest text-[#C0BAB0] mb-3">
                  {t("nav.language")}
                </p>
                <div className="flex gap-3 flex-wrap">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        i18n.changeLanguage(lang.code);
                        setOpen(false);
                      }}
                      className="flex items-center gap-2 px-3 py-1.5 transition-colors duration-200"
                      style={{
                        fontSize: "11px",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        border:
                          i18n.language === lang.code
                            ? "1px solid #7A9E7E"
                            : "1px solid #E2DDD6",
                        color:
                          i18n.language === lang.code ? "#7A9E7E" : "#6B6B6B",
                        background:
                          i18n.language === lang.code
                            ? "#EDF2ED"
                            : "transparent",
                        cursor: "pointer",
                      }}
                    >
                      <span className="text-sm">{lang.flag}</span>
                      <span>{lang.code.toUpperCase()}</span>
                    </button>
                  ))}
                </div>
              </li>
            </ul>

            <div className="flex items-center gap-2 text-[#165323] text-[11px] tracking-wide px-6 pb-6">
              <span className="w-2 h-2 rounded-full bg-[#165323] animate-pulse" />
              {t("nav.available")}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
