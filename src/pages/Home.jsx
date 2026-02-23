import { useEffect, useRef, useState } from "react";
import { projects } from "../data/projects";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import emailjs from "@emailjs/browser";

import Nav from "../components/NavHome";
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

// ─── Hero ────────────────────────────────────────────────────────
function Hero() {
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
          Montreal, QC · Open to work
        </div>

        <h1
          className="font-serif font-light text-[#1C1C1E] leading-[0.95] tracking-tight mb-10"
          style={{ fontSize: "clamp(3.5rem, 7vw, 6.5rem)" }}
        >
          Built with
          <br />
          <em className="italic text-[#7A9E7E]">surgical</em>
          <br />
          precision
        </h1>

        <p className="text-[#6B6B6B] text-[15px] leading-relaxed max-w-md mb-8">
          Full-stack developer with a background in{" "}
          <strong className="text-[#1C1C1E] font-medium">
            dentistry and industrial design
          </strong>
          . I build clean, purposeful digital experiences — from API
          integrations to CAD automation. Three careers. One mindset.
        </p>

        <div className="flex items-center gap-4 mt-25">
          <a
            href="#work"
            className="bg-[#1C1C1E] text-[#F7F5F0] px-8 py-3.5 text-[11px] uppercase tracking-widest hover:bg-[#7A9E7E] transition-colors duration-200"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="text-[11px] uppercase tracking-widest text-[#6B6B6B] hover:text-[#7A9E7E] transition-colors duration-200"
          >
            Contact Me →
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
        {/* Photo placeholder */}
        <div className="w-full aspect-[4/2] bg-[#E2DDD6] flex items-center justify-center relative overflow-hidden">
          <img src="/images/profil.jpg" alt="" />
          {/* Decorative corner marks */}
          <span className="absolute top-3 left-3 w-5 h-5 border-t border-l border-[#7A9E7E]" />
          <span className="absolute top-3 right-3 w-5 h-5 border-t border-r border-[#7A9E7E]" />
          <span className="absolute bottom-3 left-3 w-5 h-5 border-b border-l border-[#7A9E7E]" />
          <span className="absolute bottom-3 right-3 w-5 h-5 border-b border-r border-[#7A9E7E]" />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 border border-[#E2DDD6]">
          {[
            { num: "4", label: "Spoken" },
            { num: "5+", label: "Projects" },
            { num: "3", label: "Careers" },
          ].map((s, i) => (
            <div
              key={i}
              className={`py-5 text-center ${
                i < 2 ? "border-r border-[#E2DDD6]" : ""
              }`}
            >
              <h2 className="text-[13px] uppercase tracking-widest text-[#6B6B6B] mt-1">
                {s.label}
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
            Tech Stack
          </h2>
          <div className="flex flex-col gap-3">
            {[
              {
                label: "Back-end",
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
                label: "Front-end",
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
                label: "Outils",
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
              <div key={category.label}>
                <h3 className="text-[12px] uppercase tracking-widest text-[#165323] mb-1.5">
                  {category.label}
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
        Scroll
      </div>
    </section>
  );
}

// ─── Projects ─────────────────────────────────────────────────────────────────
function Projects() {
  return (
    <section
      id="work"
      className="px-6 md:px-16 py-12 md:py-24 border-t border-[#E2DDD6] bg-[#F7F5F0]"
    >
      <div className="relative mb-6 md:mb-14">
        {/* Titre — centré mobile, gauche desktop */}
        <div className="text-center md:text-left">
          <p className="text-[13px] uppercase tracking-widest text-[#165323] mb-2">
            Selected Work
          </p>
          <h2
            className="font-serif font-light text-[#1C1C1E] leading-tight"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
          >
            Web Development
            <br />
            Projects
          </h2>
        </div>

        {/* SVG desktop — absolu à droite */}
        <div
          className="hidden md:block absolute right-0 top-0"
          style={{ width: "55%" }}
        >
          <ProjectsHeaderSVG />
        </div>

        {/* SVG mobile — en dessous du titre */}
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
            className="w-full bg-white border border-[#E2DDD6] overflow-hidden group hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
          >
            {/* Seule la partie image + info est cliquable vers le détail */}
            <Link to={`/project/${project.slug || project.id}`}>
              <div className="w-full aspect-video bg-[#EDF2ED] flex items-center justify-center">
                <img
                  src={project.image}
                  alt={`Descktop showing the project ${project.title}`}
                />
              </div>
              <div className="px-6 pt-6 pb-2">
                <p className="text-[12px] uppercase tracking-widest text-[#165323] mb-1.5">
                  {project.type}
                </p>
                <h3 className="font-serif text-xl font-normal text-[#1C1C1E] mb-2">
                  {project.title}
                </h3>
                <p className="text-[13px] text-[#6B6B6B] leading-relaxed mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="text-[11px] px-2.5 py-1 bg-[#EDF2ED] text-[#165323] rounded-full"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Link>

            {/* Liens externes — en dehors du Link */}
            <div className="flex gap-4 px-6 pb-6">
              {project.slug === "portfolio" ? (
                <span className="text-[11px] uppercase tracking-widest text-[#7A9E7E]">
                  You're already here
                </span>
              ) : project.live ? (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] uppercase tracking-widest text-[#6B6B6B] hover:text-[#7A9E7E] transition-colors"
                >
                  Live →
                </a>
              ) : null}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] uppercase tracking-widest text-[#6B6B6B] hover:text-[#7A9E7E] transition-colors"
                >
                  GitHub →
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
              About
            </p>
            <h2
              className="font-serif font-light leading-tight mb-6"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
            >
              An unusual
              <br />
              <em className="italic text-[#7A9E7E]">trajectory</em>
            </h2>
          </div>
          <p className="text-[15px] text-[#F7F5F0]/60 leading-relaxed">
            From dentistry in Brazil to industrial design and web development
            in Montreal — my path has been anything but linear. Each career gave
            me a different lens: precision from medicine, aesthetics from
            design, and logic from code. The result is a developer who thinks in
            systems and obsesses over details.
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
          {[
            {
              year: "2026",
              title: "Web Development — Collège Maisonneuve",
              sub: "Full-stack projects, REST APIs, MVC & agile teamwork",
            },
            {
              year: "2022",
              title: "Industrial Designer - EMSOM ",
              sub: "3D modeling, 2D technical drawings & prototyping",
            },
            {
              year: "2008",
              title: "Dentist - UEFS",
              sub: "Oral surgery, prosthetics & restorative care",
            },
          ].map((item, i) => (
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

  const filtered = testimonialsList.filter((t) => t.page === page);

  const handleSubmit = () => {
    // Validation — affiche l'erreur 2 secondes
    if (!form.name || !form.role || !form.text) {
      setError("Please fullfill all fields. Thank you.");
      setTimeout(() => setError(false), 2000);
      return;
    }

    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          name: form.name,
          role: form.role,
          text: form.text,
        },
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
      .catch(() => {
        alert("Something went wrong. Please try again.");
      });
  };

  return (
    <section className="relative px-6 md:px-16 py-12 md:py-24 border-t border-[#E2DDD6] bg-[#F7F5F0]">
      <div className="text-center mb-14">
        <p className="text-[12px] uppercase tracking-widest text-[#165323] mb-2">
          Testimonials
        </p>
        <h2
          className="font-serif font-light text-[#1C1C1E]"
          style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
        >
          What people say
        </h2>
      </div>

      <Caroussel
        items={filtered}
        itemsPerPage={3}
        renderItem={(t, i) => (
          <motion.div
            key={t.id}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={i * 0.1}
            className="bg-white border border-[#165323] p-8"
          >
            <p className="text-[14px] text-[#6B6B6B] leading-relaxed italic mb-6">
              " {t.text} "
            </p>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#EDF2ED] flex items-center justify-center text-[11px] font-medium text-[#165323]">
                {t.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
              </div>
              <div>
                <p className="text-[13px] font-medium text-[#1C1C1E]">
                  {t.name}
                </p>
                <p className="text-[11px] text-[#6B6B6B]">{t.role}</p>
              </div>
            </div>
          </motion.div>
        )}
      />

      {/* Bouton laisser un avis */}
      <div className="text-center mt-12">
        <button
          onClick={() => setShowModal(true)}
          className="text-[11px] uppercase tracking-widest text-[#165323] border border-[#7A9E7E] px-6 py-2 hover:bg-[#7A9E7E] hover:text-white transition-colors duration-300"
        >
          Leave a testimonial
        </button>
      </div>

      {/* Modal */}
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
                    Thank you.
                  </p>
                  <p className="text-[13px] text-[#6B6B6B]">
                    Your testimonial has been received.
                  </p>
                </div>
              ) : (
                <>
                  <p className="text-[10px] uppercase tracking-widest text-[#7A9E7E] mb-1">
                    Your voice
                  </p>
                  <h3 className="font-serif font-light text-[#1C1C1E] text-2xl mb-8">
                    Leave a testimonial
                  </h3>

                  <div className="flex flex-col gap-4">
                    <input
                      type="text"
                      placeholder="Your name"
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      className="bg-white border border-[#E2DDD6] px-4 py-3 text-[13px] text-[#1C1C1E] placeholder:text-[#C0BAB0] outline-none focus:border-[#7A9E7E] transition-colors"
                    />
                    <input
                      type="text"
                      placeholder="Your role"
                      value={form.role}
                      onChange={(e) =>
                        setForm({ ...form, role: e.target.value })
                      }
                      className="bg-white border border-[#E2DDD6] px-4 py-3 text-[13px] text-[#1C1C1E] placeholder:text-[#C0BAB0] outline-none focus:border-[#7A9E7E] transition-colors"
                    />
                    <textarea
                      placeholder="Your message"
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
                      Cancel
                    </button>
                    <button
                      onClick={handleSubmit}
                      className="text-[11px] uppercase tracking-widest text-white bg-[#7A9E7E] px-6 py-2 hover:bg-[#5C8060] transition-colors duration-300"
                    >
                      Submit
                    </button>
                  </div>
                  {/* Message erreur — apparaît par dessus le form */}
                  <AnimatePresence>
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="absolute inset-0 z-10 flex items-center justify-center bg-[#F7F5F0]/90"
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
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation — affiche l'erreur 2 secondes
    if (!form.name || !form.email || !form.message) {
      setError("Please fullfill all fields. Thank you.");
      setTimeout(() => setError(false), 2000);
      return;
    }

    if (!isValidEmail(form.email)) {
      setError("Please enter a valid email address.");
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
        // Reaffiche le form après 3 secondes
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
              Contact
            </p>
            <h2
              className="font-serif font-light text-[#1C1C1E] leading-tight mb-4"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
            >
              Let's build
              <br />
              something
            </h2>
            <p className="text-[15px] text-[#6B6B6B] leading-relaxed mb-8">
              Open to full-time positions, freelance projects, or just a good
              conversation about code and design.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            {[
              { label: "GitHub", href: "https://github.com/Daniloncc" },
              {
                label: "LinkedIn",
                href: "https://www.linkedin.com/in/danilo-nunes-costa-e-costa-12b451181/",
              },
            ].map((item) =>
              item.href ? (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-[13px] text-[#6B6B6B] hover:text-[#7A9E7E] transition-colors flex items-center gap-2"
                >
                  <span className="text-[#165323]">→</span> {item.label}
                </a>
              ) : (
                <p
                  key={item.label}
                  className="text-[13px] text-[#6B6B6B] flex items-center gap-2"
                >
                  <span className="text-[#165323]">→</span> {item.label}
                </p>
              )
            )}
          </div>
        </motion.div>

        {/* Form */}
        <div className="relative">
          {/* Message erreur — apparaît par dessus le form */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="absolute inset-0 z-10 flex items-center justify-center bg-[#F7F5F0]/90"
              >
                <p className="text-[12px] uppercase tracking-widest text-red-400 border border-red-200 px-6 py-3 bg-white">
                  {error}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {submitted ? (
              // Message de remerciement
              <motion.div
                key="thanks"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="py-16 text-center"
              >
                <p className="font-serif text-[#1C1C1E] text-2xl mb-2">
                  Message sent.
                </p>
                <p className="text-[13px] text-[#6B6B6B]">
                  I'll get back to you soon. Thank you.
                </p>
              </motion.div>
            ) : (
              // Formulaire
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
                    label: "Name",
                    type: "text",
                    placeholder: "Your name",
                  },
                  {
                    id: "email",
                    label: "Email",
                    type: "email",
                    placeholder: "your@email.com",
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
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    placeholder="Tell me about your project or opportunity..."
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
                  {loading ? "Sending..." : "Send Message"}
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
