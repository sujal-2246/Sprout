import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Check } from "lucide-react";
import Button from "../ui/Button";

// No POST /api/newsletter yet (see docs/PHASE1.md §8) — submitting just
// flips local UI state to a confirmation message. Swapping this for a real
// request later only touches handleSubmit.
export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
  };

  return (
    <section className="mx-auto max-w-7xl px-6 py-14">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-center gap-5 rounded-2xl border border-base-border bg-gradient-to-br from-sprout/10 via-base-surface to-base-surface px-6 py-14 text-center"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sprout/15 text-sprout">
          <Mail className="h-5 w-5" strokeWidth={1.5} />
        </div>
        <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
          New vendors and restocks, once a week
        </h2>
        <p className="max-w-md text-sm text-ink-muted">
          No spam, no daily blasts — just a Friday note about what's new across
          the marketplace.
        </p>

        {submitted ? (
          <p className="flex items-center gap-2 text-sm font-medium text-sprout">
            <Check className="h-4 w-4" /> You're on the list.
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex w-full max-w-sm flex-col gap-2 sm:flex-row"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              aria-label="Email address"
              className="w-full rounded-lg border border-base-border bg-base-surface px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:border-sprout/50 focus:outline-none focus:ring-2 focus:ring-sprout/40"
            />
            <Button type="submit" size="md" className="shrink-0">
              Subscribe
            </Button>
          </form>
        )}
      </motion.div>
    </section>
  );
}
