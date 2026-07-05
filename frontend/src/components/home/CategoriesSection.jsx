import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";
import { CATEGORIES } from "../../data/categories";

export default function CategoriesSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-14">
      <SectionHeading
        eyebrow="Browse"
        title="Shop by category"
        description="Every listing on Sprout starts in one of these — pick a lane or explore all of them from the full marketplace."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {CATEGORIES.map(({ slug, label, description, icon: Icon }, i) => (
          <motion.div
            key={slug}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
          >
            <Link
              to={`/marketplace?category=${slug}`}
              className="group flex h-full flex-col justify-between rounded-2xl border border-base-border bg-base-surface p-6 transition-all hover:-translate-y-1 hover:border-sprout/40 hover:shadow-soft-lg"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sprout/10 text-sprout">
                <Icon className="h-5 w-5" strokeWidth={1.5} />
              </div>
              <div className="mt-6">
                <h3 className="font-display text-lg font-medium text-ink">
                  {label}
                </h3>
                <p className="mt-1 text-sm text-ink-muted">{description}</p>
              </div>
              <div className="mt-4 flex items-center gap-1 text-sm text-ink-muted transition-colors group-hover:text-sprout">
                Explore <ArrowUpRight className="h-3.5 w-3.5" />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
