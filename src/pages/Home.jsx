import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import emailjs from "@emailjs/browser";
import { projects } from "../data/projects";
import { useTranslation } from "react-i18next";

import Nav from "../components/NavHome";
import CustomCursor from "../components/CustomCursorWeb";
import ProjectsHeaderSVG from "../components/ProjectsHeaderSVG";
import Caroussel from "../components/Caroussel";
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

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-screen grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start px-6 md:px-16 pt-24 md:pt-28 pb-16 bg-[#F7F5F0]">
      {/* Left */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0}
      >
        <div className="inline-flex items-center gap-2 bg-[#EDF2ED] text-[#165323] text-[11px] uppercase tracking-widest px-4 py-1.5 rounded-full mb-8">
          <span className="w-1.5 h-1.5 text-bold rounded-full bg-[#165323]" />
          {t("hero.badge")}
        </div>

        <h1
          className="font-serif font-light text-[#1C1C1E] leading-[0.95] tracking-tight mb-10"
          style={{ fontSize: "clamp(3.5rem, 7vw, 6.5rem)" }}
        >
          {t("hero.title_1")}
          <br />
          <em className="italic text-[#7A9E7E]">{t("hero.title_2")}</em>
          <br />
          {t("hero.title_3")}
        </h1>

        <p
          className="text-[#6B6B6B] text-[15px] leading-relaxed max-w-md mb-8"
          dangerouslySetInnerHTML={{ __html: t("hero.description") }}
        />

        <div className="flex items-center gap-4 mt-25">
          <a
            href="#work"
            className="bg-[#1C1C1E] text-[#F7F5F0] px-8 py-3.5 text-[11px] uppercase tracking-widest hover:bg-[#7A9E7E] transition-colors duration-200"
          >
            {t("hero.cta_work")}
          </a>
          <a
            href="#contact"
            className="text-[11px] uppercase tracking-widest text-[#6B6B6B] hover:text-[#7A9E7E] transition-colors duration-200"
          >
            {t("hero.cta_contact")}
          </a>
        </div>
      </motion.div>

      {/* Right */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0.15}
        className="flex flex-col gap-6"
      >
        {/* Photo */}
        <div className="w-full aspect-[4/2] bg-[#E2DDD6] flex items-center justify-center relative overflow-hidden">
          <img src="/images/profil.jpg" alt="" />
          <span className="absolute top-3 left-3 w-5 h-5 border-t border-l border-[#7A9E7E]" />
          <span className="absolute top-3 right-3 w-5 h-5 border-t border-r border-[#7A9E7E]" />
          <span className="absolute bottom-3 left-3 w-5 h-5 border-b border-l border-[#7A9E7E]" />
          <span className="absolute bottom-3 right-3 w-5 h-5 border-b border-r border-[#7A9E7E]" />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 border border-[#E2DDD6]">
          {[
            { num: "4", labelKey: "hero.stats.spoken" },
            { num: "4", labelKey: "hero.stats.projects" },
            { num: "3", labelKey: "hero.stats.careers" },
          ].map((s, i) => (
            <div
              key={i}
              className={`py-5 text-center ${
                i < 2 ? "border-r border-[#E2DDD6]" : ""
              }`}
            >
              <h2 className="text-[13px] uppercase tracking-widest text-[#6B6B6B] mt-1">
                {t(s.labelKey)}
              </h2>
              <span className="font-serif text-4xl font-light text-[#1C1C1E]">
                {s.num}
              </span>
            </div>
          ))}
        </div>

        {/* Skills */}
        <div>
          <h2 className="text-[13px] uppercase tracking-widest text-[#6B6B6B] mb-4">
            {t("hero.stack.title")}
          </h2>
          <div className="flex flex-col gap-3">
            {[
              {
                labelKey: "hero.stack.backend",
                skills: [
                  "PHP",
                  "Laravel",
                  "Symfony",
                  "Node.js",
                  "Express",
                  "API REST",
                  "MySQL",
                  "PostgreSQL",
                  "JSON / XML",
                  "MVC",
                ],
              },
              {
                labelKey: "hero.stack.frontend",
                skills: [
                  "HTML",
                  "CSS3",
                  "JavaScript ES6+",
                  "React",
                  "Smarty",
                  "jQuery",
                  "Tailwind",
                  "Bootstrap",
                  "Figma",
                ],
              },
              {
                labelKey: "hero.stack.tools",
                skills: [
                  "Git",
                  "GitHub",
                  "Bitbucket",
                  "Jira",
                  "NPM",
                  "Composer",
                  "Postman",
                  "Linux",
                ],
              },
            ].map((category) => (
              <div key={category.labelKey}>
                <h3 className="text-[12px] uppercase tracking-widest text-[#165323] mb-1.5">
                  {t(category.labelKey)}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-[11px] px-3 py-1 border border-[#E2DDD6] text-[#6B6B6B] bg-white hover:border-[#7A9E7E] hover:text-[#7A9E7E] transition-colors duration-200 cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Scroll hint */}
      <div className="hidden md:flex absolute bottom-10 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-[#6B6B6B] text-[12px] uppercase tracking-widest">
        <span
          className="w-px h-10 bg-gradient-to-b from-[#E2DDD6] to-[#7A9E7E]"
          style={{ animation: "scrollLine 1.5s ease infinite" }}
        />
        {t("hero.scroll")}
      </div>
    </section>
  );
}

// ─── Projects ─────────────────────────────────────────────────────────────────
function Projects() {
  const { t } = useTranslation();

  return (
    <section
      id="work"
      className="px-6 md:px-16 py-12 md:py-24 border-t border-[#E2DDD6] bg-[#F7F5F0]"
    >
      <div className="relative mb-6 md:mb-14">
        <div className="text-center md:text-left">
          <p className="text-[13px] uppercase tracking-widest text-[#165323] mb-2">
            {t("projects.label")}
          </p>
          <h2
            className="font-serif font-light text-[#1C1C1E] leading-tight"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
          >
            {t("projects.title_1")}
            <br />
            {t("projects.title_2")}
          </h2>
        </div>

        <div
          className="hidden md:block absolute right-0 top-0"
          style={{ width: "55%" }}
        >
          <ProjectsHeaderSVG />
        </div>
        <div className="block md:hidden mt-3 w-full">
          <ProjectsHeaderSVG />
        </div>
      </div>

      <Caroussel
        items={projects}
        renderItem={(project, i) => (
          <motion.div
            key={project.id}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={i * 0.1}
            className="w-full bg-white border border-[#E2DDD6] overflow-hidden group hover:-translate-y-1 hover:shadow-xl transition-all duration-300 flex flex-col"
          >
            <Link to={`/project/${project.slug || project.id}`}>
              <div className="w-full aspect-video bg-[#EDF2ED] flex items-center justify-center">
                <img
                  src={project.image}
                  alt={`Desktop showing the project ${project.title}`}
                />
              </div>
              <div className="px-6 pt-6 pb-2">
                <p className="text-[12px] uppercase tracking-widest text-[#165323] mb-1.5">
                  {t(`projects_data.${project.slug}.type`)}
                </p>
                <h3 className="font-serif text-xl font-normal text-[#1C1C1E] mb-2">
                  {project.title}
                </h3>
                <p className="text-[13px] text-[#6B6B6B] leading-relaxed mb-4">
                  {t(`projects_data.${project.slug}.description`)}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="text-[11px] px-2.5 py-1 bg-[#EDF2ED] text-[#165323] rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </Link>

            <div className="flex gap-4 px-6  mb-3 mt-auto">
              {project.slug === "portfolio" ? (
                <span className="text-[11px] uppercase tracking-widest text-[#7A9E7E]">
                  {t("projects.already_here")}
                </span>
              ) : project.live ? (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] uppercase tracking-widest text-[#6B6B6B] hover:text-[#7A9E7E] transition-colors"
                >
                  {t("projects.live")}
                </a>
              ) : null}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] uppercase tracking-widest text-[#6B6B6B] hover:text-[#7A9E7E] transition-colors"
                >
                  {t("projects.github")}
                </a>
              )}
            </div>
          </motion.div>
        )}
      />
    </section>
  );
}

// ─── About ────────────────────────────────────────────────────────────────────
function About() {
  const { t } = useTranslation();
  const timeline = t("about.timeline", { returnObjects: true });

  return (
    <section
      id="about"
      className="bg-[#1C1C1E] text-[#F7F5F0] px-6 md:px-16 py-12 md:py-24"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-24 items-center">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="text-center md:text-left">
            <p className="text-[12px] uppercase tracking-widest text-[#B5D1BB] mb-3">
              {t("about.label")}
            </p>
            <h2
              className="font-serif font-light leading-tight mb-6"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
            >
              {t("about.title_1")}
              <br />
              <em className="italic text-[#7A9E7E]">{t("about.title_2")}</em>
            </h2>
          </div>
          <p className="text-[15px] text-[#F7F5F0]/60 leading-relaxed">
            {t("about.description")}
          </p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.15}
          className="flex flex-col gap-6"
        >
          {timeline.map((item, i) => (
            <div key={i} className="grid grid-cols-[80px_1fr] gap-6">
              <span className="font-serif text-sm text-[#7A9E7E] tracking-wide">
                {item.year}
              </span>
              <div>
                <strong className="block text-sm font-medium text-[#F7F5F0] mb-0.5">
                  {item.title}
                </strong>
                <span className="text-[13px] text-[#F7F5F0]/50">
                  {item.sub}
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
function Testimonials({ page = "web" }) {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "", role: "", text: "" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [testimonialsList, setTestimonialsList] = useState([]);

  useEffect(() => {
    fetch("/data/testimonials.json")
      .then((res) => res.json())
      .then((data) => setTestimonialsList(data));
  }, []);

  const filtered = testimonialsList.filter((item) => item.page === page);

  const handleSubmit = () => {
    if (!form.name || !form.role || !form.text) {
      setError(t("testimonials.error"));
      setTimeout(() => setError(false), 2000);
      return;
    }
    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        { name: form.name, role: form.role, text: form.text },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(() => {
        setSubmitted(true);
        setTimeout(() => {
          setShowModal(false);
          setSubmitted(false);
          setForm({ name: "", role: "", text: "" });
        }, 2000);
      })
      .catch(() => alert("Something went wrong. Please try again."));
  };

  return (
    <section className="relative px-6 md:px-16 py-12 md:py-24 border-t border-[#E2DDD6] bg-[#F7F5F0]">
      <div className="text-center mb-14">
        <p className="text-[12px] uppercase tracking-widest text-[#165323] mb-2">
          {t("testimonials.label")}
        </p>
        <h2
          className="font-serif font-light text-[#1C1C1E]"
          style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
        >
          {t("testimonials.title")}
        </h2>
      </div>

      <Caroussel
        items={filtered}
        itemsPerPage={3}
        renderItem={(item, i) => (
          <motion.div
            key={item.id}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={i * 0.1}
            className="bg-white border border-[#165323] p-8"
          >
            <p className="text-[14px] text-[#6B6B6B] leading-relaxed italic mb-6">
              " {item.text} "
            </p>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#EDF2ED] flex items-center justify-center text-[11px] font-medium text-[#165323]">
                {item.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
              </div>
              <div>
                <p className="text-[13px] font-medium text-[#1C1C1E]">
                  {item.name}
                </p>
                <p className="text-[11px] text-[#6B6B6B]">{item.role}</p>
              </div>
            </div>
          </motion.div>
        )}
      />

      <div className="text-center mt-12">
        <button
          onClick={() => setShowModal(true)}
          className="text-[11px] uppercase tracking-widest text-[#165323] border border-[#7A9E7E] px-6 py-2 hover:bg-[#7A9E7E] hover:text-white transition-colors duration-300"
        >
          {t("testimonials.leave")}
        </button>
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-3 flex items-center justify-center px-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-[#F7F5F0] border border-[#E2DDD6] p-10 max-w-lg w-full"
            >
              {submitted ? (
                <div className="text-center py-8">
                  <p className="font-serif text-[#1C1C1E] text-xl mb-2">
                    {t("testimonials.thank_you")}
                  </p>
                  <p className="text-[13px] text-[#6B6B6B]">
                    {t("testimonials.received")}
                  </p>
                </div>
              ) : (
                <>
                  <p className="text-[10px] uppercase tracking-widest text-[#7A9E7E] mb-1">
                    {t("testimonials.your_voice")}
                  </p>
                  <h3 className="font-serif font-light text-[#1C1C1E] text-2xl mb-8">
                    {t("testimonials.modal_title")}
                  </h3>
                  <div className="flex flex-col gap-4">
                    <input
                      type="text"
                      placeholder={t("testimonials.name_placeholder")}
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      className="bg-white border border-[#E2DDD6] px-4 py-3 text-[13px] text-[#1C1C1E] placeholder:text-[#C0BAB0] outline-none focus:border-[#7A9E7E] transition-colors"
                    />
                    <input
                      type="text"
                      placeholder={t("testimonials.role_placeholder")}
                      value={form.role}
                      onChange={(e) =>
                        setForm({ ...form, role: e.target.value })
                      }
                      className="bg-white border border-[#E2DDD6] px-4 py-3 text-[13px] text-[#1C1C1E] placeholder:text-[#C0BAB0] outline-none focus:border-[#7A9E7E] transition-colors"
                    />
                    <textarea
                      placeholder={t("testimonials.message_placeholder")}
                      rows={4}
                      value={form.text}
                      onChange={(e) =>
                        setForm({ ...form, text: e.target.value })
                      }
                      className="bg-white border border-[#E2DDD6] px-4 py-3 text-[13px] text-[#1C1C1E] placeholder:text-[#C0BAB0] outline-none focus:border-[#7A9E7E] transition-colors resize-none"
                    />
                  </div>
                  <div className="flex justify-between items-center mt-8">
                    <button
                      onClick={() => setShowModal(false)}
                      className="text-[11px] text-[#6B6B6B] uppercase tracking-widest hover:text-[#1C1C1E] transition-colors"
                    >
                      {t("testimonials.cancel")}
                    </button>
                    <button
                      onClick={handleSubmit}
                      className="text-[11px] uppercase tracking-widest text-white bg-[#7A9E7E] px-6 py-2 hover:bg-[#5C8060] transition-colors duration-300"
                    >
                      {t("testimonials.submit")}
                    </button>
                  </div>
                  <AnimatePresence>
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="absolute inset-0 z-3 flex items-center justify-center bg-[#F7F5F0]/90"
                      >
                        <p className="text-[12px] uppercase tracking-widest text-red-400 border border-red-200 px-6 py-3 bg-white">
                          {error}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────
function Contact() {
  const { t } = useTranslation();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setError(t("contact.error_fields"));
      setTimeout(() => setError(false), 2000);
      return;
    }
    if (!isValidEmail(form.email)) {
      setError(t("contact.error_email"));
      setTimeout(() => setError(false), 2000);
      return;
    }
    setLoading(true);
    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID,
        { name: form.name, email: form.email, message: form.message },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(() => {
        setLoading(false);
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          setForm({ name: "", email: "", message: "" });
        }, 3000);
      })
      .catch(() => {
        alert("Something went wrong. Please try again.");
        setLoading(false);
      });
  };

  return (
    <section
      id="contact"
      className="px-6 md:px-16 py-12 md:py-24 border-t border-[#E2DDD6] bg-[#F7F5F0]"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-24 items-start">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="text-center md:text-left">
            <p className="text-[12px] uppercase tracking-widest text-[#165323] mb-3">
              {t("contact.label")}
            </p>
            <h2
              className="font-serif font-light text-[#1C1C1E] leading-tight mb-4"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
            >
              {t("contact.title_1")}
              <br />
              {t("contact.title_2")}
            </h2>
            <p className="text-[15px] text-[#6B6B6B] leading-relaxed mb-8">
              {t("contact.description")}
            </p>
          </div>
          <div className="flex flex-col gap-3">
            {[
              { label: "GitHub", href: "https://github.com/Daniloncc" },
              {
                label: "LinkedIn",
                href: "https://www.linkedin.com/in/danilo-nunes-costa-e-costa-12b451181/",
              },
            ].map((item) => (
              <span className="text-[#165323] flex items-center gap-2">
                →{" "}
                <a
                  key={item.label}
                  href={item.href}
                  className="text-[13px] text-[#6B6B6B] hover:text-[#7A9E7E] transition-colors "
                >
                  {" "}
                  {item.label}
                </a>
              </span>
            ))}
          </div>
        </motion.div>

        {/* Form */}
        <div className="relative">
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="absolute inset-0 z-3 flex items-center justify-center bg-[#F7F5F0]/90"
              >
                <p className="text-[12px] uppercase tracking-widest text-red-400 border border-red-200 px-6 py-3 bg-white">
                  {error}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="thanks"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="py-16 text-center"
              >
                <p className="font-serif text-[#1C1C1E] text-2xl mb-2">
                  {t("contact.success_title")}
                </p>
                <p className="text-[13px] text-[#6B6B6B]">
                  {t("contact.success_sub")}
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={0.15}
                className="flex flex-col gap-5"
                onSubmit={handleSubmit}
              >
                {[
                  {
                    id: "name",
                    label: t("contact.name_label"),
                    type: "text",
                    placeholder: t("contact.name_placeholder"),
                  },
                  {
                    id: "email",
                    label: t("contact.email_label"),
                    type: "email",
                    placeholder: t("contact.email_placeholder"),
                  },
                ].map((field) => (
                  <div key={field.id}>
                    <label
                      htmlFor={field.id}
                      className="block text-[10px] uppercase tracking-widest text-[#6B6B6B] mb-2"
                    >
                      {field.label}
                    </label>
                    <input
                      id={field.id}
                      type={field.type}
                      placeholder={field.placeholder}
                      value={form[field.id]}
                      onChange={(e) =>
                        setForm({ ...form, [field.id]: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-white border border-[#E2DDD6] text-[14px] text-[#1C1C1E] placeholder-[#C0BAB0] outline-none focus:border-[#7A9E7E] transition-colors duration-200"
                    />
                  </div>
                ))}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-[10px] uppercase tracking-widest text-[#6B6B6B] mb-2"
                  >
                    {t("contact.message_label")}
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    placeholder={t("contact.message_placeholder")}
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-white border border-[#E2DDD6] text-[14px] text-[#1C1C1E] placeholder-[#C0BAB0] outline-none focus:border-[#7A9E7E] transition-colors duration-200 resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-[#1C1C1E] text-[#F7F5F0] text-[11px] uppercase tracking-widest hover:bg-[#7A9E7E] transition-colors duration-200 disabled:opacity-50"
                >
                  {loading ? t("contact.sending") : t("contact.send")}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <div className="relative">
      <CustomCursor />
      <Nav />
      <Hero />
      <Projects />
      <About />
      <Testimonials page="web" />
      <Contact />
      <Footer />
    </div>
  );
}
