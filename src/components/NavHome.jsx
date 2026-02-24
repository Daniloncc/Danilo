import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "../components/LogoHome";

const versions = [
  { label: "Industrial Designer", href: "/industrial" },
  { label: "Dentist", href: "#" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Ferme le dropdown si on clique ailleurs
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
    <nav className="fixed top-0 left-0 right-0 z-2 bg-[#F7F5F0] border-b border-[#E2DDD6]">
      <div className="flex items-center justify-between px-6 md:px-16 py-5">
        <Logo />

        {/* Desktop links */}
        <ul className="hidden md:flex gap-10 list-none items-center">
          {["Work", "About", "Contact"].map((item) => (
            <li key={item}>
              <a
                href={`#${item.toLowerCase()}`}
                className="text-[11px] uppercase tracking-widest text-[#6B6B6B] hover:text-[#7A9E7E] transition-colors duration-200"
              >
                {item}
              </a>
            </li>
          ))}

          {/* Desktop dropdown */}
          <li className="relative mt-1" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-1.5 text-[11px] uppercase tracking-widest text-[#6B6B6B] hover:text-[#7A9E7E] transition-colors duration-200"
            >
              Versions
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
        </ul>

        {/* Desktop status */}
        <div className="hidden md:flex items-center gap-2 text-[#165323] text-[11px] tracking-wide">
          <span className="w-2 h-2 rounded-full bg-[#165323] animate-pulse" />
          Available for work
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
              {["Work", "About", "Contact"].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    onClick={() => setOpen(false)}
                    className="text-[13px] uppercase tracking-widest text-[#6B6B6B] hover:text-[#7A9E7E] transition-colors duration-200"
                  >
                    {item}
                  </a>
                </li>
              ))}

              {/* Mobile versions — affichés directement */}
              <li>
                <p className="text-[10px] uppercase tracking-widest text-[#C0BAB0] mb-3">
                  Other Versions
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
            </ul>

            <div className="flex items-center gap-2 text-[#165323] text-[11px] tracking-wide px-6 pb-6">
              <span className="w-2 h-2 rounded-full bg-[#165323] animate-pulse" />
              Available for work
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
