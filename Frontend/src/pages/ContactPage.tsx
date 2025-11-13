import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Send,
  Linkedin,
  MessageCircle,
  Calendar,
} from "lucide-react";
import { motion } from "framer-motion";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  function validate() {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email))
      e.email = "Enter a valid email";
    if (form.subject.trim().length < 3)
      e.subject = "Subject should be at least 3 characters";
    if (form.message.trim().length < 10)
      e.message = "Message should be at least 10 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSending(true);
    setErrors({});
    try {
      const response = await fetch(`${API_BASE_URL}/contact/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSent(true);
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setErrors({ form: data.message || "Something went wrong. Please try again later." });
      }
    } catch (err) {
      setErrors({ form: "Network error. Please check your connection and try again." });
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 py-12 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <motion.header
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Get in touch
          </h1>
          <p className="mt-2 text-slate-600 dark:text-slate-300 max-w-2xl">
            Have a project, question or partnership idea? Drop a message and
            we’ll respond within 24–48 hours.
          </p>
        </motion.header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <motion.section
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-slate-800 shadow-md rounded-2xl p-8"
          >
            <form onSubmit={handleSubmit} noValidate>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="flex flex-col">
                  <span className="text-sm font-medium mb-1">Your name</span>
                  <input
                    value={form.name}
                    onChange={(e) =>
                      setForm((s) => ({ ...s, name: e.target.value }))
                    }
                    className={`rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:bg-slate-700 dark:border-slate-700 ${
                      errors.name ? "border-rose-500" : "border-slate-200"
                    }`}
                    placeholder="Ebrahim Kamal"
                  />
                  {errors.name && (
                    <span className="text-rose-500 text-sm mt-1">
                      {errors.name}
                    </span>
                  )}
                </label>

                <label className="flex flex-col">
                  <span className="text-sm font-medium mb-1">Email</span>
                  <input
                    value={form.email}
                    onChange={(e) =>
                      setForm((s) => ({ ...s, email: e.target.value }))
                    }
                    className={`rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:bg-slate-700 dark:border-slate-700 ${
                      errors.email ? "border-rose-500" : "border-slate-200"
                    }`}
                    placeholder="you@company.com"
                  />
                  {errors.email && (
                    <span className="text-rose-500 text-sm mt-1">
                      {errors.email}
                    </span>
                  )}
                </label>
              </div>

              <label className="flex flex-col mt-4">
                <span className="text-sm font-medium mb-1">Subject</span>
                <input
                  value={form.subject}
                  onChange={(e) =>
                    setForm((s) => ({ ...s, subject: e.target.value }))
                  }
                  className={`rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:bg-slate-700 dark:border-slate-700 ${
                    errors.subject ? "border-rose-500" : "border-slate-200"
                  }`}
                  placeholder="Project, Collaboration, Question..."
                />
                {errors.subject && (
                  <span className="text-rose-500 text-sm mt-1">
                    {errors.subject}
                  </span>
                )}
              </label>

              <label className="flex flex-col mt-4">
                <span className="text-sm font-medium mb-1">Message</span>
                <textarea
                  value={form.message}
                  onChange={(e) =>
                    setForm((s) => ({ ...s, message: e.target.value }))
                  }
                  rows={6}
                  className={`rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:bg-slate-700 dark:border-slate-700 ${
                    errors.message ? "border-rose-500" : "border-slate-200"
                  }`}
                  placeholder="Tell me about your project, goals, timeline..."
                />
                {errors.message && (
                  <span className="text-rose-500 text-sm mt-1">
                    {errors.message}
                  </span>
                )}
              </label>

              <div className="flex items-center justify-between mt-6">
                <span className="text-sm text-slate-500 dark:text-slate-400">
                  Prefer direct contact? See details to the right.
                </span>
                <button
                  type="submit"
                  disabled={sending}
                  className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white font-semibold rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                >
                  <Send className="w-4 h-4" />
                  <span>
                    {sending ? "Sending..." : sent ? "Sent" : "Send message"}
                  </span>
                </button>
              </div>

              {sent && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4 text-sm text-green-600"
                >
                  Thanks — your message has been sent. We’ll get back to you
                  shortly.
                </motion.p>
              )}
            </form>

            <div className="mt-6 border-t pt-6 text-sm text-slate-600 dark:text-slate-300">
              <p className="font-semibold">Tips to get a faster reply</p>
              <ul className="mt-2 space-y-1">
                <li>• Include your target timeline and budget.</li>
                <li>• Attach relevant links (product pages, screenshots).</li>
                <li>
                  • If you’re shipping from Bangladesh, mention your preferred
                  port.
                </li>
              </ul>
            </div>
          </motion.section>

          <motion.aside
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55 }}
            className="space-y-6"
          >
            <div className="bg-white dark:bg-slate-800 shadow-md rounded-2xl p-6">
              <h3 className="text-lg font-semibold">Contact details</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                I help global e-commerce brands source smarter, ship faster, and
                scale with confidence — from Rajshahi to the world.
              </p>

              <div className="mt-4 grid grid-cols-1 gap-3">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-900/20">
                    <Mail className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">Email</div>
                    <a
                      className="text-sm text-slate-600 dark:text-slate-300 hover:underline flex items-center gap-2"
                      href="mailto:ebrahimmdkamal@outlook.com"
                    >
                      ebrahimmdkamal@outlook.com
                      <ExternalLink className="w-3 h-3 opacity-60" />
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-900/20">
                    <Phone className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">Phone</div>
                    <a
                      className="text-sm text-slate-600 dark:text-slate-300 hover:underline"
                      href="tel:+8801750062927"
                    >
                      +8801750062927
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-sky-50 dark:bg-sky-900/20">
                    <MapPin className="w-5 h-5 text-sky-600" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">Location</div>
                    <div className="text-sm text-slate-600 dark:text-slate-300">
                      Tech Rajshahi Ltd, Rajshahi, Bangladesh
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <a
                  aria-label="LinkedIn"
                  href="https://www.linkedin.com/in/ebrahimmdkamalofficial/"
                  className="inline-flex items-center gap-2 rounded-lg px-3 py-2 border text-sm hover:shadow-sm"
                >
                  <Linkedin className="w-4 h-4" /> LinkedIn
                </a>
                <a
                  aria-label="WhatsApp"
                  href="https://wa.me/8801750062927"
                  className="inline-flex items-center gap-2 rounded-lg px-3 py-2 border text-sm hover:shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" /> WhatsApp
                </a>
                <a
                  aria-label="Calendly"
                  href="https://calendly.com/ebrahimmohammadkamal1/30min"
                  className="inline-flex items-center gap-2 rounded-lg px-3 py-2 border text-sm hover:shadow-sm"
                >
                  <Calendar className="w-4 h-4" /> Book a Meeting
                </a>
              </div>
            </div>
            <div className="bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-start justify-center gap-4">
                <div className="flex items-center justify-center gap-3">
                  <a
                    href="https://calendly.com/ebrahimmohammadkamal1/30min"
                    className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 rounded-md px-3 py-2 font-semibold"
                  >
                    <Calendar className="w-4 h-4" /> Book a Meeting
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 shadow-md rounded-2xl overflow-hidden">
              <iframe
                title="office-map"
                className="w-full h-56"
                loading="lazy"
                src="https://www.google.com/maps?q=Tech+Rajshahi+Ltd,+Rajshahi,+Bangladesh&output=embed"
              />
              <div className="p-4">
                <div className="text-sm font-medium">Office hours</div>
                <div className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                  Mon — Fri · 9:00 — 18:00 (GMT+6)
                </div>
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </div>
  );
}
