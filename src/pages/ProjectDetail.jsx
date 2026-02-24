import { useEffect, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useTranslation } from "react-i18next";
import { projectDetails } from "../data/projectDetails";

import Nav from "../components/NavHome";
import CustomCursor from "../components/CustomCursorWeb";
import Footer from "../components/FooterHome";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

function SectionHeading({ label }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="mb-6 text-center md:text-left">
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

export default function ProjectDetail() {
  const { id } = useParams();
  const { t } = useTranslation();

  // Find static data (slug, tech, images, links) from projectDetails
  const staticProject = projectDetails.find(
    (p) => p.slug === id || String(p.id) === String(id)
  );

  const navigate = useNavigate();

  const handleBackToWork = () => {
    navigate("/");
    setTimeout(() => {
      const el = document.getElementById("work");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!staticProject) {
    return (
      <div className="min-h-screen bg-[#F7F5F0] flex items-center justify-center px-6">
        <div className="text-center">
          <p className="text-[11px] uppercase tracking-widest text-[#6B6B6B] mb-4">
            {t("project_detail.not_found_label")}
          </p>
          <h1 className="font-serif text-4xl text-[#1C1C1E] mb-6">
            {t("project_detail.not_found_title")}
          </h1>
          <Link
            to="/"
            className="text-[11px] uppercase tracking-widest text-[#7A9E7E] hover:text-[#165323] transition-colors"
          >
            {t("project_detail.not_found_back")}
          </Link>
        </div>
      </div>
    );
  }
  const slug = staticProject.slug;

  // Translated text — pulled from JSON via slug key
  const subtitle = t(`projects_detail_data.${slug}.subtitle`);
  const challenge = t(`projects_detail_data.${slug}.challenge`);
  const approach = t(`projects_detail_data.${slug}.approach`);
  const solution = t(`projects_detail_data.${slug}.solution`);
  const outcome = t(`projects_detail_data.${slug}.outcome`);
  const outcomes = t(`projects_detail_data.${slug}.outcomes`, {
    returnObjects: true,
  });
  const metaTrans = t(`projects_detail_data.${slug}.meta`, {
    returnObjects: true,
  });

  // Sidebar rows — label from JSON, value from translated meta
  const sidebarRows = [
    { labelKey: "project_detail.sidebar.context", value: metaTrans?.context },
    { labelKey: "project_detail.sidebar.role", value: metaTrans?.role },
    { labelKey: "project_detail.sidebar.year", value: staticProject.meta.year },
    { labelKey: "project_detail.sidebar.duration", value: metaTrans?.duration },
    { labelKey: "project_detail.sidebar.team", value: metaTrans?.team },
  ];

  return (
    <div className="relative bg-[#F7F5F0] min-h-screen">
      <CustomCursor />
      <Nav />

      {/* ── Hero Header ───────────────────────────────────────────── */}
      <section className="pt-24 md:pt-32 px-6 md:px-16 pb-10 md:pb-16 border-b border-[#E2DDD6]">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
        >
          <div className="text-center md:text-left">
            <button
              onClick={handleBackToWork}
              className="inline-flex items-center gap-2 text-[11px] uppercase tracking-widest text-[#6B6B6B] hover:text-[#7A9E7E] transition-colors mb-8 md:mb-10 bg-transparent border-none cursor-pointer"
            >
              {t("project_detail.back")}
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-10 md:gap-20 items-start">
          {/* Left */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.05}
          >
            <div className="text-center md:text-left">
              <h1
                className="font-serif font-light text-[#1C1C1E] leading-[0.92] tracking-tight mb-6"
                style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)" }}
              >
                {staticProject.title}
              </h1>
              <p className="text-[16px] text-[#6B6B6B] leading-relaxed mb-10 md:mb-14">
                {subtitle}
              </p>
            </div>

            <div className="pt-6 md:pt-20 max-w-3xl">
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <SectionHeading
                  label={t("project_detail.sections.challenge")}
                />
                <p className="text-[16px] text-[#6B6B6B] leading-relaxed">
                  {challenge}
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.aside
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.15}
            className="flex flex-col gap-5 bg-white border border-[#E2DDD6] p-6 md:p-7"
          >
            {sidebarRows.map(({ labelKey, value }) =>
              value ? (
                <div key={labelKey}>
                  <p className="text-[10px] uppercase tracking-widest text-[#6B6B6B] mb-0.5">
                    {t(labelKey)}
                  </p>
                  <p className="text-[14px] text-[#165323] font-medium">
                    {value}
                  </p>
                </div>
              ) : null
            )}

            {/* Tools */}
            <div className="border-t border-[#E2DDD6] pt-5">
              <p className="text-[10px] uppercase tracking-widest text-[#6B6B6B] mb-3">
                {t("project_detail.sidebar.tools")}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {staticProject.tech.map((tech) => (
                  <span
                    key={tech}
                    className="text-[11px] px-2.5 py-1 border border-[#E2DDD6] text-[#6B6B6B] hover:border-[#7A9E7E] hover:text-[#7A9E7E] transition-colors bg-[#F7F5F0]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Methodologies */}
            {staticProject.methodologies?.length > 0 && (
              <div className="border-t border-[#E2DDD6] pt-5">
                <p className="text-[10px] uppercase tracking-widest text-[#6B6B6B] mb-3">
                  {t("project_detail.sidebar.methodologies")}
                </p>
                <ul className="flex flex-col gap-1.5">
                  {staticProject.methodologies.map((m) => (
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

            {/* Links */}
            <div className="border-t border-[#E2DDD6] pt-5 flex flex-col gap-2">
              {staticProject.meta.github && (
                <a
                  href={staticProject.meta.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] uppercase tracking-widest text-[#6B6B6B] hover:text-[#7A9E7E] transition-colors flex items-center gap-2"
                >
                  <span className="text-[#165323]">→</span>{" "}
                  {t("project_detail.sidebar.github")}
                </a>
              )}
              {staticProject.slug === "portfolio" ? (
                <span className="text-[11px] uppercase tracking-widest text-[#7A9E7E]">
                  {t("project_detail.sidebar.already_here")}
                </span>
              ) : staticProject.meta.live ? (
                <a
                  href={staticProject.meta.live}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] uppercase tracking-widest text-[#6B6B6B] hover:text-[#7A9E7E] transition-colors flex items-center gap-2"
                >
                  <span className="text-[#165323]">→</span>{" "}
                  {t("project_detail.sidebar.live")}
                </a>
              ) : null}
              {staticProject.meta.figma && (
                <a
                  href={staticProject.meta.figma}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] uppercase tracking-widest text-[#6B6B6B] hover:text-[#7A9E7E] transition-colors flex items-center gap-2"
                >
                  <span className="text-[#165323]">→</span>{" "}
                  {t("project_detail.sidebar.figma")}
                </a>
              )}
            </div>
          </motion.aside>
        </div>
      </section>

      {/* ── Cover Image ───────────────────────────────────────────── */}
      {staticProject.slug !== "portfolio" && (
        <motion.section
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.25}
          className="px-6 md:px-16 py-8 md:py-10 border-b border-[#E2DDD6]"
        >
          <div className="relative w-full aspect-[16/9] md:aspect-[16/7] bg-[#E2DDD6] overflow-hidden">
            <img
              src={staticProject.coverImage}
              alt={staticProject.title}
              className="w-full h-full object-contain"
            />
            <span className="absolute top-3 left-3 md:top-4 md:left-4 w-5 h-5 md:w-6 md:h-6 border-t border-l border-[#7A9E7E]" />
            <span className="absolute top-3 right-3 md:top-4 md:right-4 w-5 h-5 md:w-6 md:h-6 border-t border-r border-[#7A9E7E]" />
            <span className="absolute bottom-3 left-3 md:bottom-4 md:left-4 w-5 h-5 md:w-6 md:h-6 border-b border-l border-[#7A9E7E]" />
            <span className="absolute bottom-3 right-3 md:bottom-4 md:right-4 w-5 h-5 md:w-6 md:h-6 border-b border-r border-[#7A9E7E]" />
          </div>
        </motion.section>
      )}

      {/* ── Approach ──────────────────────────────────────────────── */}
      {approach && (
        <section className="px-6 md:px-16 py-12 md:py-20 border-b border-[#E2DDD6] bg-white">
          <div className="flex flex-wrap gap-8 md:gap-12 items-start">
            <div className="w-full md:flex-1 md:min-w-[280px] md:max-w-3xl">
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <SectionHeading label={t("project_detail.sections.approach")} />
                <p className="text-[16px] text-[#6B6B6B] leading-relaxed">
                  {approach}
                </p>
              </motion.div>
            </div>

            {staticProject.screenshots?.length > 0 && (
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={0.1}
                className="w-full md:flex-1 md:min-w-[280px] flex flex-wrap gap-4"
              >
                {staticProject.screenshots.map((src, i) => (
                  <div key={i} className="w-full bg-[#E2DDD6] overflow-hidden">
                    <img
                      src={src}
                      alt={`${staticProject.title} screenshot ${i + 1}`}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                ))}
              </motion.div>
            )}
          </div>
        </section>
      )}

      {/* ── Solution ──────────────────────────────────────────────── */}
      {solution && (
        <section className="px-6 md:px-16 py-12 md:py-20 border-b border-[#E2DDD6]">
          <div className="max-w-3xl">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <SectionHeading label={t("project_detail.sections.solution")} />
              <p className="text-[16px] text-[#6B6B6B] leading-relaxed mb-8">
                {solution}
              </p>
            </motion.div>
            {Array.isArray(outcomes) && outcomes.length > 0 && (
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={0.1}
              >
                <ul className="flex flex-col gap-2 mt-4">
                  {outcomes.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-[14px] text-[#165323]"
                    >
                      <span className="text-[#7A9E7E] shrink-0">→</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </div>
        </section>
      )}

      {/* ── Outcome ───────────────────────────────────────────────── */}
      {outcome && (
        <section className="px-6 md:px-16 py-12 md:py-20 border-b border-[#E2DDD6] bg-[#1C1C1E]">
          <div className="max-w-3xl text-center md:text-left">
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
                    {t("project_detail.sections.outcome")}
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
                {outcome}
              </p>
            </motion.div>
            <button
              onClick={handleBackToWork}
              className="inline-flex items-center gap-2 text-[11px] uppercase tracking-widest text-[#7A9E7E] hover:text-[#6B6B6B] transition-colors mt-10 bg-transparent border-none cursor-pointer"
            >
              {t("project_detail.back")}
            </button>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
