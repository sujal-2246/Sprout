import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Keyboard,
  Footprints,
  Headphones,
  Sprout as SproutIcon,
} from "lucide-react";
import Button from "../ui/Button";

const STATS = [
  { label: "Independent vendors", value: "500+" },
  { label: "Products listed", value: "12,000+" },
  { label: "Average vendor rating", value: "4.8/5" },
];

// The three floating tiles echo the same category → color mapping used on
// ProductImage, so the hero's signature visual isn't decoration invented
// for this one section — it's the same visual language the rest of the
// catalog uses, just given room to breathe.
const FLOATING_TILES = [
  {
    Icon: Keyboard,
    tone: "from-sprout/30 to-sprout/5 text-sprout",
    delay: 0,
    x: "-6%",
    y: "10%",
  },
  {
    Icon: Footprints,
    tone: "from-soil/30 to-soil/5 text-soil",
    delay: 0.15,
    x: "58%",
    y: "2%",
  },
  {
    Icon: Headphones,
    tone: "from-ink/15 to-ink/0 text-ink-muted",
    delay: 0.3,
    x: "30%",
    y: "48%",
  },
];

export default function HeroBanner() {
  return (
    <section className="relative overflow-hidden border-b border-base-border">
      {/* Ambient background glow — quiet, not a full pattern */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(600px circle at 15% 20%, rgb(var(--color-sprout) / 0.10), transparent 60%), radial-gradient(500px circle at 85% 60%, rgb(var(--color-soil) / 0.08), transparent 60%)",
        }}
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-20 lg:grid-cols-2 lg:items-center lg:py-28">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-base-border bg-base-surface px-3 py-1 font-mono text-xs text-sprout"
          >
            <SproutIcon className="h-3.5 w-3.5" />A marketplace for independent
            makers
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-balance font-display text-4xl font-semibold leading-[1.1] tracking-tight text-ink sm:text-5xl lg:text-6xl"
          >
            Shop small. <span className="text-sprout">Grow together.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-5 max-w-md text-base text-ink-muted"
          >
            Sprout brings together vendors who obsess over their craft — from
            hand-tuned keyboards to trail-tested boots — in one place worth
            browsing, not just searching.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Button as={Link} to="/marketplace" size="lg">
              Browse marketplace <ArrowRight className="h-4 w-4" />
            </Button>
            <Button as={Link} to="/marketplace" variant="secondary" size="lg">
              Become a vendor
            </Button>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mt-12 grid grid-cols-3 gap-6 border-t border-base-border pt-6"
          >
            {STATS.map((stat) => (
              <div key={stat.label}>
                <dt className="font-mono text-xl font-semibold text-ink sm:text-2xl">
                  {stat.value}
                </dt>
                <dd className="mt-1 text-xs text-ink-muted">{stat.label}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* Decorative composition — hidden on small screens, where it would
            just compete with the text for space. */}
        <div className="relative hidden h-[420px] lg:block" aria-hidden="true">
          {FLOATING_TILES.map(({ Icon, tone, delay, x, y }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1, y: [0, -12, 0] }}
              transition={{
                opacity: { duration: 0.5, delay },
                scale: { duration: 0.5, delay },
                y: {
                  duration: 5 + i,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay,
                },
              }}
              className={`absolute flex h-40 w-40 items-center justify-center rounded-2xl border border-base-border bg-gradient-to-br shadow-soft-lg ${tone}`}
              style={{ left: x, top: y }}
            >
              <Icon className="h-14 w-14" strokeWidth={1} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
