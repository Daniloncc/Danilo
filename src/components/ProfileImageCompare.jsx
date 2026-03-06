import { useState, useRef, useCallback } from "react";

export default function ProfileImageCompare() {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef(null);
  const isDragging = useRef(false);

  const updateSlider = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setSliderPos((x / rect.width) * 100);
  }, []);

  const handleMouseDown = (e) => {
    isDragging.current = true;
    updateSlider(e.clientX);
  };
  const handleMouseMove = (e) => {
    if (isDragging.current) updateSlider(e.clientX);
  };
  const handleMouseUp = () => {
    isDragging.current = false;
  };
  const handleTouchMove = (e) => {
    updateSlider(e.touches[0].clientX);
  };

  return (
    <div
      ref={containerRef}
      className="w-full aspect-[4/2] relative overflow-hidden cursor-col-resize select-none"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleMouseUp}
    >
      {/* Image normale — en dessous, plein espace */}
      <img
        src="/images/profil.webp"
        alt="Danilo profil"
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />

      {/* Image matrix — même taille, clippée avec clip-path */}
      <img
        src="/images/profil_matrix.webp"
        alt="Danilo profil matrix"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
        draggable={false}
      />

      {/* Ligne séparatrice */}
      <div
        className="absolute top-0 bottom-0 w-px pointer-events-none"
        style={{ left: `${sliderPos}%`, background: "rgba(255,255,255,0.35)" }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 rounded-full border border-white/40 bg-white/10 backdrop-blur-sm" />
      </div>

      {/* Coins décoratifs */}
      <span className="absolute top-3 left-3 w-5 h-5 border-t border-l border-[#7A9E7E] pointer-events-none" />
      <span className="absolute top-3 right-3 w-5 h-5 border-t border-r border-[#7A9E7E] pointer-events-none" />
      <span className="absolute bottom-3 left-3 w-5 h-5 border-b border-l border-[#7A9E7E] pointer-events-none" />
      <span className="absolute bottom-3 right-3 w-5 h-5 border-b border-r border-[#7A9E7E] pointer-events-none" />
    </div>
  );
}
