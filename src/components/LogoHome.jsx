export default function Logo() {
  const daniloLetters = [
    { char: "a", delay: "0.08s" },
    { char: "n", delay: "0.16s" },
    { char: "i", delay: "0.24s" },
    { char: "l", delay: "0.32s" },
    { char: "o", delay: "0.40s" },
  ];
  const costaLetters = [
    { char: "o", delay: "0.56s" },
    { char: "s", delay: "0.64s" },
    { char: "t", delay: "0.72s" },
    { char: "a", delay: "0.80s" },
  ];

  return (
    <a
      href="/"
      className="font-serif text-xl tracking-wide text-[#1C1C1E] flex items-center group"
      style={{ width: "160px" }}
    >
      <span>D</span>

      {daniloLetters.map((l, i) => (
        <span
          key={i}
          className="text-[#7A9E7E] inline-block max-w-0 overflow-hidden opacity-0 transition-all duration-300 group-hover:max-w-[2rem] group-hover:opacity-100"
          style={{ transitionDelay: l.delay }}
        >
          {l.char}
        </span>
      ))}

      {/* Espace fixe entre les deux mots */}
      <span
        className="inline-block w-0 overflow-hidden transition-all duration-150 group-hover:w-[0.5ch]"
        style={{ transitionDelay: "0.44s" }}
      />

      <span>C</span>

      {costaLetters.map((l, i) => (
        <span
          key={i}
          className="text-[#7A9E7E] inline-block max-w-0 overflow-hidden opacity-0 transition-all duration-300 group-hover:max-w-[2rem] group-hover:opacity-100"
          style={{ transitionDelay: l.delay }}
        >
          {l.char}
        </span>
      ))}
    </a>
  );
}
