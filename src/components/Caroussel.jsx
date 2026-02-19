import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Caroussel({ items, renderItem, itemsPerPage = 3 }) {
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(1);

  const totalPages = Math.ceil(items.length / itemsPerPage);
  const currentItems = items.slice(
    page * itemsPerPage,
    (page + 1) * itemsPerPage
  );

  const canPrev = page > 0;
  const canNext = page < totalPages - 1;

  const navigate = (dir) => {
    setDirection(dir);
    setPage((p) => p + dir);
  };

  // Fade subtil — juste opacité, léger y
  const variants = {
    enter: { opacity: 0, y: 8 },
    center: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -8 },
  };

  if (totalPages <= 1) {
    return (
      <div className="grid grid-cols-3 gap-6">
        {currentItems.map((item, i) => renderItem(item, i))}
      </div>
    );
  }

  return (
    <div className="relative px-10">
      <div className="overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="grid grid-cols-3 gap-6"
          >
            {currentItems.map((item, i) => renderItem(item, i))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Flèche gauche */}
      <button
        onClick={() => navigate(-1)}
        disabled={!canPrev}
        aria-label="Previous"
        className={`absolute left-0 top-1/2 -translate-y-1/2 text-7xl transition-colors duration-200
          ${
            canPrev
              ? "text-[#7A9E7E] hover:text-[#1C1C1E]"
              : "text-[#E2DDD6] cursor-not-allowed pointer-events-none"
          }`}
      >
        ‹
      </button>

      {/* Flèche droite */}
      <button
        onClick={() => navigate(1)}
        disabled={!canNext}
        aria-label="Next"
        className={`absolute right-0 top-1/2 -translate-y-1/2 text-7xl transition-colors duration-200
          ${
            canNext
              ? "text-[#7A9E7E] hover:text-[#1C1C1E]"
              : "text-[#E2DDD6] cursor-not-allowed pointer-events-none"
          }`}
      >
        ›
      </button>
    </div>
  );
}

export default Caroussel;
