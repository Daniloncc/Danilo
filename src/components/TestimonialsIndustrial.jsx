import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (d = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: d },
  }),
};

// ─── Single testimonial card ───────────────────────────────────────
function TestimonialCard({ item, index }) {
  const [hov, setHov] = useState(false);

  const initials = item.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <motion.div
      data-hover
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      custom={index * 0.12}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? "rgba(199,82,26,1)" : "#1A1A18",
        padding: "1.75rem",
        transition: "background 0.2s",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Corner index */}
      <span
        style={{
          position: "absolute",
          top: "0.75rem",
          right: "0.75rem",
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: "0.75rem",
          color: hov ? "#1A1A18" : "rgba(199,82,26,0.85)",
          letterSpacing: "0.05em",
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Quote mark */}
      <p
        style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: "2rem",
          color: hov ? "#1A1A18" : "#C7521A",
          lineHeight: 1,
          marginBottom: "0.5rem",
          opacity: 0.6,
        }}
      >
        "
      </p>

      <p
        style={{
          fontSize: "0.82rem",
          color: hov ? "#1A1A18" : "rgba(255,255,255,0.55)",
          lineHeight: 1.75,
          marginBottom: "1.5rem",
          fontStyle: "italic",
        }}
      >
        {item.text}
      </p>

      {/* Separator */}
      <div
        style={{
          width: "2rem",
          height: "1px",
          background: hov ? "#1A1A18" : "rgba(199,82,26,0.4)",
          marginBottom: "1rem",
        }}
      />

      {/* Author */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <div
          style={{
            width: "32px",
            height: "32px",
            background: "rgba(199,82,26,0.15)",
            border: hov ? "1px solid #1A1A18" : "1px solid rgba(199,82,26,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "0.6rem",
              color: hov ? "#1A1A18" : "#C7521A",
              letterSpacing: "0.04em",
            }}
          >
            {initials}
          </span>
        </div>
        <div>
          <p
            style={{
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: "0.78rem",
              fontWeight: 600,
              color: hov ? "#1A1A18" : "rgba(255,255,255,0.85)",
              marginBottom: "0.1rem",
            }}
          >
            {item.name}
          </p>
          <p
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "0.6rem",
              color: hov ? "#1A1A18" : "rgba(255,255,255,0.3)",
              letterSpacing: "0.05em",
            }}
          >
            {item.role}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Modal form ───────────────────────────────────────────────────
function TestimonialModal({ onClose }) {
  const [form, setForm] = useState({ name: "", role: "", text: "" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = () => {
    if (!form.name || !form.role || !form.text) {
      setError("All fields are required.");
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
        setTimeout(() => onClose(), 2500);
      })
      .catch(() => {
        setError("Something went wrong. Please try again.");
        setTimeout(() => setError(false), 2500);
      });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.7)",
        zIndex: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#1A1A18",
          border: "1px solid rgba(255,255,255,0.1)",
          borderTop: "2px solid #C7521A",
          padding: "2.5rem",
          maxWidth: "480px",
          width: "100%",
          position: "relative",
        }}
      >
        {/* Grid bg */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />

        {submitted ? (
          <div
            style={{
              textAlign: "center",
              padding: "2rem 0",
              position: "relative",
              zIndex: 1,
            }}
          >
            <p
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "0.65rem",
                color: "#C7521A",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: "0.5rem",
              }}
            >
              // TRANSMISSION_COMPLETE
            </p>
            <p
              style={{
                fontSize: "1.1rem",
                fontWeight: 600,
                color: "rgba(255,255,255,0.85)",
              }}
            >
              Thank you.
            </p>
            <p
              style={{
                fontSize: "0.78rem",
                color: "rgba(255,255,255,0.35)",
                marginTop: "0.4rem",
                fontFamily: "'IBM Plex Mono', monospace",
              }}
            >
              Your testimonial has been received.
            </p>
          </div>
        ) : (
          <div style={{ position: "relative", zIndex: 1 }}>
            <p
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "0.62rem",
                color: "#C7521A",
                letterSpacing: "0.1em",
                marginBottom: "0.25rem",
              }}
            >
              // INPUT_FORM
            </p>
            <h3
              style={{
                fontSize: "1.3rem",
                fontWeight: 300,
                color: "rgba(255,255,255,0.85)",
                marginBottom: "2rem",
                letterSpacing: "-0.02em",
              }}
            >
              Leave a <strong style={{ fontWeight: 600 }}>testimonial</strong>
            </h3>

            {[
              { key: "name", placeholder: "Your name" },
              { key: "role", placeholder: "Your role / title" },
            ].map(({ key, placeholder }) => (
              <input
                key={key}
                type="text"
                placeholder={placeholder}
                value={form[key]}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                style={{
                  display: "block",
                  width: "100%",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "rgba(255,255,255,0.75)",
                  padding: "0.75rem 1rem",
                  fontSize: "0.8rem",
                  fontFamily: "'IBM Plex Sans', sans-serif",
                  outline: "none",
                  marginBottom: "0.75rem",
                  boxSizing: "border-box",
                  transition: "border-color 0.2s",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#C7521A")}
                onBlur={(e) =>
                  (e.target.style.borderColor = "rgba(255,255,255,0.1)")
                }
              />
            ))}

            <textarea
              placeholder="Your message"
              rows={4}
              value={form.text}
              onChange={(e) => setForm({ ...form, text: e.target.value })}
              style={{
                display: "block",
                width: "100%",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.75)",
                padding: "0.75rem 1rem",
                fontSize: "0.8rem",
                fontFamily: "'IBM Plex Sans', sans-serif",
                outline: "none",
                resize: "none",
                marginBottom: "2rem",
                boxSizing: "border-box",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#C7521A")}
              onBlur={(e) =>
                (e.target.style.borderColor = "rgba(255,255,255,0.1)")
              }
            />

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <button
                onClick={onClose}
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: "0.6rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.3)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.target.style.color = "rgba(255,255,255,0.7)")
                }
                onMouseLeave={(e) =>
                  (e.target.style.color = "rgba(255,255,255,0.3)")
                }
              >
                // Cancel
              </button>
              <button
                onClick={handleSubmit}
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: "0.6rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "white",
                  background: "#C7521A",
                  border: "none",
                  cursor: "pointer",
                  padding: "0.55rem 1.25rem",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => (e.target.style.background = "#A8421A")}
                onMouseLeave={(e) => (e.target.style.background = "#C7521A")}
              >
                SUBMIT →
              </button>
            </div>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "rgba(26,26,24,0.92)",
                    zIndex: 10,
                  }}
                >
                  <p
                    style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: "0.65rem",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "#C7521A",
                      border: "1px solid rgba(199,82,26,0.3)",
                      padding: "0.75rem 1.5rem",
                    }}
                  >
                    ⚠ {error}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────
export default function TestimonialsIndustrial({ page = "industrial" }) {
  const [showModal, setShowModal] = useState(false);
  const [testimonialsList, setTestimonialsList] = useState([]);

  // ── Même logique que la page web : fetch + filter par page ──
  useEffect(() => {
    fetch("/data/testimonials.json")
      .then((res) => res.json())
      .then((data) => setTestimonialsList(data));
  }, []);

  const filtered = testimonialsList.filter((t) => t.page === page);

  return (
    <section
      id="testimonials"
      style={{
        color: "white",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        padding: "4rem 1.5rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Grid bg */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div
        style={{ maxWidth: "1200px", margin: "0 auto", position: "relative" }}
        className="md:px-6"
      >
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{ marginBottom: "2.5rem" }}
        >
          <p
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "0.62rem",
              color: "#C7521A",
              letterSpacing: "0.1em",
              marginBottom: "0.25rem",
            }}
          >
            // 03 — FIELD REPORTS
          </p>
          <h2
            style={{
              fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
              fontWeight: 300,
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
              color: "#1A1A18",
            }}
          >
            What people{" "}
            <strong style={{ fontWeight: 600, color: "#C7521A" }}>say</strong>
          </h2>
        </motion.div>

        {/* Cards grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "1px",
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.08)",
            marginBottom: "2rem",
          }}
        >
          {filtered.map((item, i) => (
            <TestimonialCard key={item.id} item={item} index={i} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.3}
          style={{ display: "flex", justifyContent: "flex-end" }}
        >
          <button
            data-hover
            onClick={() => setShowModal(true)}
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "0.8rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.9)",
              background: "#C7521A",
              border: "1px solid rgba(255,255,255,0.12)",
              padding: "0.55rem 1.25rem",
              cursor: "pointer",
              transition: "all 0.4s",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "transparent";
              e.target.style.borderColor = "#C7521A";
              e.target.style.color = "#C7521A";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "#C7521A";
              e.target.style.borderColor = "rgba(255,255,255,0.12)";
              e.target.style.color = "rgba(255,255,255,0.9)";
            }}
          >
            + Leave a testimonial
          </button>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && <TestimonialModal onClose={() => setShowModal(false)} />}
      </AnimatePresence>
    </section>
  );
}
