import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Caroussel({ items, renderItem }) {
  const getItemsPerPage = (w) => (w < 640 ? 1 : w < 1024 ? 2 : 3);

  const [state, setState] = useState({
    page: 0,
    itemsPerPage: getItemsPerPage(window.innerWidth),
  });

  useEffect(() => {
    const update = () => {
      setState({
        page: 0,
        itemsPerPage: getItemsPerPage(window.innerWidth),
      });
    };

    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const { page, itemsPerPage } = state;

  const totalPages = Math.ceil(items.length / itemsPerPage);
  const currentItems = items.slice(
    page * itemsPerPage,
    (page + 1) * itemsPerPage
  );
  const canPrev = page > 0;
  const canNext = page < totalPages - 1;

  const navigate = (dir) => setState((s) => ({ ...s, page: s.page + dir }));

  const gridClass =
    itemsPerPage === 1
      ? "grid-cols-1"
      : itemsPerPage === 2
      ? "grid-cols-2"
      : "grid-cols-3";

  const variants = {
    enter: { opacity: 0, y: 8 },
    center: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -8 },
  };

  if (totalPages <= 1) {
    return (
      <div className={`grid ${gridClass} gap-6`}>
        {currentItems.map((item, i) => renderItem(item, i))}
      </div>
    );
  }

  return (
    <div className="relative px-10">
      <AnimatePresence mode="wait">
        <motion.div
          key={page}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className={`grid ${gridClass} gap-6`}
        >
          {currentItems.map((item, i) => renderItem(item, i))}
        </motion.div>
      </AnimatePresence>

      {/* Flèches visibles seulement si nécessaire */}
      <button
        onClick={() => navigate(-1)}
        disabled={!canPrev}
        aria-label="Previous"
        className={`absolute left-0 top-1/2 -translate-y-1/2 text-7xl transition-colors duration-200
          ${canPrev ? "text-[#165323] hover:text-[#1C1C1E]" : "invisible"}`}
      >
        ‹
      </button>

      <button
        onClick={() => navigate(1)}
        disabled={!canNext}
        aria-label="Next"
        className={`absolute right-0 top-1/2 -translate-y-1/2 text-7xl transition-colors duration-200
          ${canNext ? "text-[#165323] hover:text-[#1C1C1E]" : "invisible"}`}
      >
        ›
      </button>
    </div>
  );
}

export default Caroussel;
