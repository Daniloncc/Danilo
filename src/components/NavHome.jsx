import Logo from "../components/LogoHome";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-2 flex items-center justify-between px-16 py-5 bg-[#F7F5F0] border-b border-[#E2DDD6]">
      <Logo />
      <ul className="flex gap-10 list-none">
        {/* ajouter apres "Industrial", "Dentist" */}
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
      </ul>
      <div className="flex items-center gap-2 text-[#165323] text-[11px] tracking-wide">
        <span className="w-2 h-2 rounded-full bg-[#165323] animate-pulse" />
        Available for work
      </div>
    </nav>
  );
}
