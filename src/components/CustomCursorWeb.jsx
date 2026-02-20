import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function CustomCursor() {
  const location = useLocation();

  useEffect(() => {
    const cursor = document.querySelector(".custom-cursor");
    const ring = document.querySelector(".custom-cursor-ring");
    if (!cursor || !ring) return;

    // Reset à chaque changement de page
    cursor.style.width = "8px";
    cursor.style.height = "8px";
    cursor.style.opacity = "1";
    ring.style.opacity = "0.5";
  }, [location]);

  useEffect(() => {
    const cursor = document.createElement("div");
    const ring = document.createElement("div");
    cursor.className = "custom-cursor";
    ring.className = "custom-cursor-ring";
    document.body.appendChild(cursor);
    document.body.appendChild(ring);

    let mx = 0,
      my = 0,
      rx = 0,
      ry = 0;

    document.addEventListener("mousemove", (e) => {
      mx = e.clientX;
      my = e.clientY;
      cursor.style.left = mx + "px";
      cursor.style.top = my + "px";
    });

    function animateRing() {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.left = rx + "px";
      ring.style.top = ry + "px";
      requestAnimationFrame(animateRing);
    }
    animateRing();

    document.addEventListener("mouseover", (e) => {
      if (e.target.closest("a, button, [role='button']")) {
        cursor.style.width = "32px";
        cursor.style.height = "32px";
        cursor.style.opacity = "0.5";
        ring.style.opacity = "0";
        cursor.style.pointerEvents = "none";
      }
    });

    document.addEventListener("mouseout", (e) => {
      if (e.target.closest("a, button, [role='button']")) {
        cursor.style.width = "8px";
        cursor.style.height = "8px";
        cursor.style.opacity = "1";
        ring.style.opacity = "0.5";
      }
    });

    return () => {
      cursor.remove();
      ring.remove();
    };
  }, []);
  return null;
}
