import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { projects } from "../data/projectsDesign";
import Nav from "../components/NavDesign";

import MechanicalReveal from "../components/MechanicalReveal";
import MechanicalRevealMobile from "../components/MechanicalRevealMobile";
import TestimonialsIndustrial from "../components/TestimonialsIndustrial";

// ─── Custom Cursor ────────────────────────────────────────────────
function IndustrialCursor() {
  useEffect(() => {
    const isTouchDevice = () =>
      window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    if (isTouchDevice()) return;

    const cursor = document.createElement("div");
    const ring = document.createElement("div");
    cursor.id = "ind-cursor";
    ring.id = "ind-ring";

    Object.assign(cursor.style, {
      position: "fixed",
      width: "6px",
      height: "6px",
      background: "#C7521A",
      borderRadius: "0",
      pointerEvents: "none",
      zIndex: "5",
      transform: "translate(-50%, -50%)",
      transition: "width 0.15s, height 0.15s",
    });
    Object.assign(ring.style, {
      position: "fixed",
      width: "24px",
      height: "24px",
      border: "1px solid #C7521A",
      borderRadius: "0",
      pointerEvents: "none",
      zIndex: "4",
      transform: "translate(-50%, -50%)",
      opacity: "0.6",
    });

    document.body.appendChild(cursor);
    document.body.appendChild(ring);
    document.body.style.cursor = "none";

    let mx = 0,
      my = 0,
      rx = 0,
      ry = 0;
    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      cursor.style.left = mx + "px";
      cursor.style.top = my + "px";
    };
    document.addEventListener("mousemove", onMove);

    const anim = () => {
      rx += (mx - rx) * 0.1;
      ry += (my - ry) * 0.1;
      ring.style.left = rx + "px";
      ring.style.top = ry + "px";
      requestAnimationFrame(anim);
    };
    anim();

    const onEnter = (e) => {
      if (e.target.closest("a, button, [data-hover]")) {
        cursor.style.width = "10px";
        cursor.style.height = "10px";
        ring.style.width = "38px";
        ring.style.height = "38px";
      }
    };
    const onLeave = (e) => {
      if (e.target.closest("a, button, [data-hover]")) {
        cursor.style.width = "6px";
        cursor.style.height = "6px";
        ring.style.width = "24px";
        ring.style.height = "24px";
      }
    };
    document.addEventListener("mouseover", onEnter);
    document.addEventListener("mouseout", onLeave);

    return () => {
      cursor.remove();
      ring.remove();
      document.body.style.cursor = "";
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onEnter);
      document.removeEventListener("mouseout", onLeave);
    };
  }, []);
  return null;
}

const specTags2 = [
  "AutoCAD",
  "Inventor",
  "iLogic",
  "3D Modeling",
  "Technical Drawing",
  "CAD Automation",
  "Python Scripts",
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (d = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: d },
  }),
};

// ─── Hero ─────────────────────────────────────────────────────────
function Hero() {
  const { t } = useTranslation();
  const identity = t("industrial.hero.identity", { returnObjects: true });

  return (
    <section className="relative z-1 pt-24 md:pt-28 px-6 md:px-12 pb-0">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center pb-10 border-b border-black/10">
        {/* Left */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
        >
          <p
            className="mb-8"
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "0.65rem",
              color: "#9A9A90",
              letterSpacing: "0.08em",
            }}
          >
            {t("industrial.hero.label")}
          </p>
          <h1
            style={{
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: "clamp(3rem, 6vw, 5.5rem)",
              fontWeight: 300,
              lineHeight: 0.95,
              letterSpacing: "-0.03em",
              marginBottom: "0.5rem",
            }}
          >
            <strong style={{ fontWeight: 600 }}>Danilo</strong>
            <br />
            COSTA
          </h1>
          <p
            className="mb-6"
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "0.85rem",
              color: "#C7521A",
              letterSpacing: "0.1em",
            }}
          >
            {t("industrial.hero.subtitle")}
          </p>
          <p
            style={{
              fontSize: "0.9rem",
              color: "#5A5A54",
              lineHeight: 1.75,
              maxWidth: "480px",
              borderLeft: "2px solid #C7521A",
              paddingLeft: "1rem",
            }}
            dangerouslySetInnerHTML={{
              __html: t("industrial.hero.description"),
            }}
          />
          <div className="mt-8 md:hidden">
            <MechanicalRevealMobile />
          </div>
        </motion.div>

        {/* Right */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.15}
          className="hidden md:flex items-center justify-center"
        >
          <MechanicalReveal />
        </motion.div>
      </div>

      {/* Specs */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0.1}
        className="py-10"
      >
        <div
          className="flex justify-between mb-6 pb-3 border-b border-black/10"
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "0.65rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#9A9A90",
          }}
        >
          <span>{t("industrial.hero.specs_title")}</span>
          <span>{t("industrial.hero.specs_rev")}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Identity */}
          <div>
            <p
              className="mb-3"
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "0.62rem",
                color: "#C7521A",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              {t("industrial.hero.identity_label")}
            </p>
            {[
              ["name", identity.name],
              ["location", identity.location],
              ["languages", identity.languages],
              ["status", identity.status, true],
            ].map(([k, v, accent]) => (
              <div
                key={k}
                className="grid gap-2 mb-1"
                style={{
                  gridTemplateColumns: "120px 1fr",
                  fontSize: "0.78rem",
                }}
              >
                <span
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    color: "#9A9A90",
                    fontSize: "0.72rem",
                  }}
                >
                  {k}
                </span>
                <span
                  style={{
                    color: accent ? "#C7521A" : "#1A1A18",
                    fontWeight: 500,
                  }}
                >
                  {v}
                </span>
              </div>
            ))}
          </div>

          {/* CAD Stack */}
          <div>
            <p
              className="mb-3"
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "0.62rem",
                color: "#C7521A",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              {t("industrial.hero.stack_label")}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {specTags2.map((tag) => (
                <SpecTag key={tag}>{tag}</SpecTag>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function SpecTag({ children }) {
  const [hov, setHov] = useState(false);
  return (
    <span
      data-hover
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: "0.62rem",
        color: hov ? "#C7521A" : "#5A5A54",
        border: `1px solid ${hov ? "#C7521A" : "rgba(26,26,24,0.12)"}`,
        padding: "0.2rem 0.6rem",
        letterSpacing: "0.06em",
        transition: "all 0.2s",
      }}
    >
      {children}
    </span>
  );
}

// ─── Projects ─────────────────────────────────────────────────────
function Projects() {
  const { t } = useTranslation();

  return (
    <section
      id="work"
      className="relative z-1 px-6 md:px-12 py-16 border-t border-black/10 bg-[#1A1A18]"
    >
      <div className="mb-10">
        <p
          className="mb-1"
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "0.62rem",
            color: "#C7521A",
            letterSpacing: "0.1em",
          }}
        >
          {t("industrial.projects.label")}
        </p>
        <h2
          style={{
            fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
            fontWeight: 300,
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
            color: "#FAFAF8",
          }}
        >
          {t("industrial.projects.title_1")}
          <br />
          <strong style={{ fontWeight: 600 }}>
            {t("industrial.projects.title_2")}
          </strong>{" "}
          {t("industrial.projects.title_3")}
        </h2>
        <span
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "0.6rem",
            color: "#C7521A",
          }}
        >
          {t("industrial.projects.disclaimer")}
        </span>
      </div>

      <div
        className="grid grid-cols-1 md:grid-cols-2"
        style={{
          gap: "1px",
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {projects.map((p, i) => (
          <ProjectCard key={i} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project, index }) {
  const { t } = useTranslation();
  const [hov, setHov] = useState(false);

  const title = t(`industrial.projects_design.${project.slug}.title`);
  const desc = t(`industrial.projects_design.${project.slug}.desc`);

  return (
    <motion.div
      data-hover
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      custom={index * 0.1}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? "#FAF0EA" : "#FAFAF8",
        overflow: "hidden",
        transition: "background 0.2s",
      }}
    >
      <div className="w-full h-52 md:h-64">
        <img
          src={project.image}
          alt={title}
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div className="p-5 md:p-6">
        <p
          className="mb-1"
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "0.6rem",
            color: "#C7521A",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          {project.ref}
        </p>
        <h3
          style={{
            fontSize: "1.1rem",
            fontWeight: 600,
            marginBottom: "0.4rem",
            letterSpacing: "-0.01em",
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontSize: "0.8rem",
            color: "#5A5A54",
            lineHeight: 1.65,
            marginBottom: "1rem",
          }}
        >
          {desc}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "0.6rem",
                border: "1px solid rgba(26,26,24,0.12)",
                color: "#5A5A54",
                padding: "0.2rem 0.55rem",
                letterSpacing: "0.05em",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ─── CAD Section ──────────────────────────────────────────────────
function CADSection() {
  const { t } = useTranslation();
  const cadTools = t("industrial.cad.tools", { returnObjects: true });

  return (
    <section
      id="cad"
      className="relative z-1 px-6 md:px-12 py-16"
      style={{
        background: "#1A1A18",
        color: "white",
        borderTop: "2px solid #C7521A",
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-10 md:gap-16 items-center">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <p
            className="mb-1"
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "0.62rem",
              color: "#C7521A",
              letterSpacing: "0.1em",
            }}
          >
            {t("industrial.cad.label")}
          </p>
          <h2
            className="mb-4"
            style={{
              fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
              fontWeight: 300,
              lineHeight: 1.2,
            }}
          >
            <strong style={{ fontWeight: 600, color: "#C7521A" }}>
              {t("industrial.cad.title_1")}
            </strong>
            <br />
            {t("industrial.cad.title_2")}
          </h2>
          <p
            style={{
              fontSize: "0.85rem",
              color: "rgba(255,255,255,0.55)",
              lineHeight: 1.75,
            }}
          >
            {t("industrial.cad.description")}
          </p>
        </motion.div>

        <div
          className="grid grid-cols-1 sm:grid-cols-2"
          style={{
            gap: "1px",
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {cadTools.map((tool, i) => (
            <CADTool key={i} tool={tool} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CADTool({ tool, index }) {
  const [hov, setHov] = useState(false);
  return (
    <motion.div
      data-hover
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      custom={index * 0.1}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? "rgba(199,82,26,0.1)" : "rgba(255,255,255,0.03)",
        padding: "1.5rem",
        transition: "background 0.2s",
      }}
    >
      <p
        className="mb-1"
        style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: "0.72rem",
          color: "#C7521A",
          letterSpacing: "0.08em",
        }}
      >
        {tool.name}
      </p>
      <p
        style={{
          fontSize: "0.78rem",
          color: "rgba(255,255,255,0.45)",
          lineHeight: 1.5,
        }}
      >
        {tool.desc}
      </p>
    </motion.div>
  );
}

// ─── Footer ───────────────────────────────────────────────────────
function Footer() {
  const { t } = useTranslation();
  return (
    <footer
      className="relative z-1 px-6 py-5 flex justify-center"
      style={{
        background: "#1A1A18",
        borderTop: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <p
        style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: "0.65rem",
          color: "rgba(255,255,255,0.6)",
          letterSpacing: "0.05em",
        }}
      >
        {t("industrial.footer")}
      </p>
    </footer>
  );
}

// ─── Page ─────────────────────────────────────────────────────────
export default function Industrial() {
  const { t } = useTranslation();

  return (
    <div
      style={{
        fontFamily: "'IBM Plex Sans', sans-serif",
        background: "#F2F0EC",
        color: "#1A1A18",
        minHeight: "100vh",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,300;0,400;0,500;1,300&family=IBM+Plex+Sans:wght@300;400;500;600&display=swap');
        .ind-grid-bg {
          position: fixed; inset: 0; pointer-events: none; z-index: 0;
          background-image:
            linear-gradient(rgba(26,26,24,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(26,26,24,0.08) 1px, transparent 1px);
          background-size: 40px 40px;
        }
        .ind-badge {
          position: fixed; bottom: 1.5rem; right: 1.5rem;
          background: #C7521A; color: white;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.62rem; letter-spacing: 0.08em;
          text-transform: uppercase; padding: 0.4rem 0.8rem; z-index: 5;
        }
      `}</style>

      <IndustrialCursor />
      <div className="ind-grid-bg" />
      <div className="ind-badge">{t("industrial.badge")}</div>
      <Nav />
      <Hero />
      <Projects />
      <TestimonialsIndustrial page="industrial" />
      <CADSection />
      <Footer />
    </div>
  );
}
