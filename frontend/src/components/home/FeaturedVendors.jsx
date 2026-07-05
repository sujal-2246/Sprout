import { motion } from "framer-motion";
import { Store } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";
import Rating from "../ui/Rating";
import { FEATURED_VENDORS } from "../../data/vendors.mock";

// No vendor storefront pages or GET /api/vendors yet (see docs/PHASE1.md
// §8/§12), so these cards are intentionally not links — a disabled-looking
// "Storefront coming soon" note is more honest than routing to a page that
// doesn't exist.
export default function FeaturedVendors() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-14">
      <SectionHeading
        eyebrow="Meet the makers"
        title="Featured vendors"
        description="Shops with the strongest track record for quality and fast shipping this quarter."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {FEATURED_VENDORS.map((vendor, i) => (
          <motion.div
            key={vendor.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="rounded-2xl border border-base-border bg-base-surface p-6"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-soil/10 text-soil">
              <Store className="h-5 w-5" strokeWidth={1.5} />
            </div>
            <h3 className="mt-5 font-display text-lg font-medium text-ink">
              {vendor.name}
            </h3>
            <p className="mt-1 text-sm text-ink-muted">{vendor.tagline}</p>
            <div className="mt-4 flex items-center justify-between">
              <Rating value={vendor.rating} size="sm" />
              <span className="text-xs text-ink-faint">
                {vendor.productCount} listings
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
