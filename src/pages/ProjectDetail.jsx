import { useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { getProjectDetail, getAdjacentProjects } from "../data/projectDetails";

import Nav from "../components/NavHome";
import CustomCursor from "../components/CustomCursorWeb";
import Footer from "../components/FooterHome";

// ─── Animation variants ──────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

// ─── Section heading ─────────────────────────────────────────────
function SectionHeading({ label }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="mb-6">
      <div className="overflow-hidden pb-3">
        <motion.h2
          className="font-serif font-light text-[#1C1C1E] text-3xl"
          initial={{ y: "100%" }}
          animate={{ y: isInView ? "0%" : "100%" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {label}
        </motion.h2>
      </div>
      <div className="relative h-px bg-[#E2DDD6]">
        <motion.div
          className="absolute top-0 left-0 h-full bg-[#7A9E7E]"
          initial={{ width: "0%" }}
          animate={{ width: isInView ? "100%" : "0%" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        />
      </div>
    </div>
  );
}

// ─── ProjectDetail Page ───────────────────────────────────────────
export default function ProjectDetail() {
  const { id } = useParams();
  const project = getProjectDetail(id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#F7F5F0] flex items-center justify-center">
        <div className="text-center">
          <p className="text-[11px] uppercase tracking-widest text-[#6B6B6B] mb-4">
            404
          </p>
          <h1 className="font-serif text-4xl text-[#1C1C1E] mb-6">
            Project not found
          </h1>
          <Link
            to="/"
            className="text-[11px] uppercase tracking-widest text-[#7A9E7E] hover:text-[#165323] transition-colors"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-[#F7F5F0] min-h-screen">
      <Nav />

      {/* ── Hero Header ─────────────────────────────────────────── */}
      <section className="pt-32 px-16 pb-16 border-b border-[#E2DDD6]">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
        >
          <Link
            to="/#work"
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-widest text-[#6B6B6B] hover:text-[#7A9E7E] transition-colors mb-10 block"
          >
            ← Back to projects
          </Link>
        </motion.div>

        <div className="grid grid-cols-[1fr_340px] gap-20 items-start">
          {/* Left — titre + subtitle + laptop animé */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.05}
          >
            <h1
              className="font-serif font-light text-[#1C1C1E] leading-[0.92] tracking-tight mb-6"
              style={{ fontSize: "clamp(3rem, 7vw, 6rem)" }}
            >
              {project.title}
            </h1>
            <p className="text-[16px] text-[#6B6B6B] leading-relaxed max-w-2xl mb-14">
              {project.subtitle}
            </p>

            {/* Laptop SVG animé */}

            {/* <section className=" py-20 border-b border-[#E2DDD6]"> */}
            <div className="pt-20 max-w-3xl">
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <SectionHeading label="Challenge" />
                <p className="text-[16px] text-[#6B6B6B] leading-relaxed">
                  {project.challenge}
                </p>
              </motion.div>
            </div>
            {/* </section> */}
          </motion.div>

          {/* Right — sidebar méta */}
          <motion.aside
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.15}
            className="flex flex-col gap-5 bg-white border border-[#E2DDD6] p-7"
          >
            {[
              { label: "Context", value: project.meta.context },
              { label: "Role", value: project.meta.role },
              { label: "Year", value: project.meta.year },
              { label: "Duration", value: project.meta.duration },
              { label: "Team", value: project.meta.team },
            ].map(({ label, value }) =>
              value ? (
                <div key={label}>
                  <p className="text-[10px] uppercase tracking-widest text-[#6B6B6B] mb-0.5">
                    {label}
                  </p>
                  <p className="text-[14px] text-[#165323] font-medium">
                    {value}
                  </p>
                </div>
              ) : null
            )}

            <div className="border-t border-[#E2DDD6] pt-5">
              <p className="text-[10px] uppercase tracking-widest text-[#6B6B6B] mb-3 flex items-center gap-2">
                <span>⚙</span> Tools
              </p>
              <div className="flex flex-wrap gap-1.5">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="text-[11px] px-2.5 py-1 border border-[#E2DDD6] text-[#6B6B6B] hover:border-[#7A9E7E] hover:text-[#7A9E7E] transition-colors bg-[#F7F5F0]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {project.methodologies?.length > 0 && (
              <div className="border-t border-[#E2DDD6] pt-5">
                <p className="text-[10px] uppercase tracking-widest text-[#6B6B6B] mb-3 flex items-center gap-2">
                  <span>◎</span> Methodologies
                </p>
                <ul className="flex flex-col gap-1.5">
                  {project.methodologies.map((m) => (
                    <li
                      key={m}
                      className="text-[12px] text-[#165323] flex items-center gap-2"
                    >
                      <span className="text-[#7A9E7E]">·</span> {m}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="border-t border-[#E2DDD6] pt-5 flex flex-col gap-2">
              {project.meta.github && (
                <a
                  href={project.meta.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] uppercase tracking-widest text-[#6B6B6B] hover:text-[#7A9E7E] transition-colors flex items-center gap-2"
                >
                  <span className="text-[#165323]">→</span> GitHub
                </a>
              )}
              {project.meta.live && (
                <a
                  href={project.meta.live}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] uppercase tracking-widest text-[#6B6B6B] hover:text-[#7A9E7E] transition-colors flex items-center gap-2"
                >
                  <span className="text-[#165323]">→</span> Live Demo
                </a>
              )}
              {project.meta.figma && (
                <a
                  href={project.meta.figma}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] uppercase tracking-widest text-[#6B6B6B] hover:text-[#7A9E7E] transition-colors flex items-center gap-2"
                >
                  <span className="text-[#165323]">→</span> Figma
                </a>
              )}
            </div>
          </motion.aside>
        </div>
      </section>

      {/* ── Cover Image ─────────────────────────────────────────── */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0.25}
        className="px-16 py-10 border-b border-[#E2DDD6]"
      >
        <div className="relative w-full aspect-[16/7] bg-[#E2DDD6] overflow-hidden">
          <img
            src={project.coverImage}
            alt={project.title}
            className="w-full h-full object-contain"
          />
          <span className="absolute top-4 left-4 w-6 h-6 border-t border-l border-[#7A9E7E]" />
          <span className="absolute top-4 right-4 w-6 h-6 border-t border-r border-[#7A9E7E]" />
          <span className="absolute bottom-4 left-4 w-6 h-6 border-b border-l border-[#7A9E7E]" />
          <span className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-[#7A9E7E]" />
        </div>
      </motion.section>

      {/* ── Approach + Screenshots ───────────────────────────────── */}
      {project.approach && (
        <section className="px-16 py-20 border-b border-[#E2DDD6] bg-white">
          <div className="flex flex-wrap gap-12 items-center">
            <div className="flex-1 min-w-[280px] max-w-3xl">
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <SectionHeading label="Approach" />
                <p className="text-[16px] text-[#6B6B6B] leading-relaxed">
                  {project.approach}
                </p>
              </motion.div>
            </div>

            {project.screenshots?.length > 0 && (
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={0.1}
                className="flex flex-wrap gap-4 flex-1 min-w-[280px]"
              >
                {project.screenshots.map((src, i) => (
                  <div key={i} className="w-full bg-[#E2DDD6] overflow-hidden">
                    <img
                      src={src}
                      alt={`${project.title} screenshot ${i + 1}`}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                ))}
              </motion.div>
            )}
          </div>
        </section>
      )}

      {/* ── Solution ─────────────────────────────────────────────── */}
      {project.solution && (
        <section className="px-16 py-20 border-b border-[#E2DDD6]">
          <div className="max-w-3xl">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <SectionHeading label="Solution" />
              <p className="text-[16px] text-[#6B6B6B] leading-relaxed mb-8">
                {project.solution}
              </p>
            </motion.div>
            {project.outcomes?.length > 0 && (
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={0.1}
              >
                <ul className="flex flex-col gap-2 mt-4">
                  {project.outcomes.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-[14px] text-[#165323]"
                    >
                      <span className="text-[#7A9E7E]">→</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </div>
        </section>
      )}

      {/* ── Outcome ──────────────────────────────────────────────── */}
      {project.outcome && (
        <section className="px-16 py-20 border-b border-[#E2DDD6] bg-[#1C1C1E]">
          <div className="max-w-3xl">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="mb-6">
                <div className="overflow-hidden pb-3">
                  <motion.h2
                    className="font-serif font-light text-[#F7F5F0] text-3xl"
                    initial={{ y: "100%" }}
                    whileInView={{ y: "0%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  >
                    Outcome
                  </motion.h2>
                </div>
                <div className="relative h-px bg-[#F7F5F0]/10">
                  <motion.div
                    className="absolute top-0 left-0 h-full bg-[#7A9E7E]"
                    initial={{ width: "0%" }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.8,
                      ease: [0.22, 1, 0.36, 1],
                      delay: 0.3,
                    }}
                  />
                </div>
              </div>
              <p className="text-[16px] text-[#F7F5F0]/70 leading-relaxed">
                {project.outcome}
              </p>
            </motion.div>
            <Link
              to="/#work"
              className="inline-flex items-center gap-2 text-[11px] uppercase tracking-widest text-[#7A9E7E] hover:text-[#6B6B6B] transition-colors mt-10 block"
            >
              ← Back to projects
            </Link>
          </div>
        </section>
      )}

      {/* ── Footer ──────────────────────────────────────────────── */}
      <Footer></Footer>
    </div>
  );
}
