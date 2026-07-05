import { Store } from "lucide-react";
import Rating from "../ui/Rating";
import { FEATURED_VENDORS } from "../../data/vendors.mock";

// The API returns only vendor_name today (see database/schema.sql —
// vendors has no bio/logo_url yet). When the vendor happens to be one of
// the mocked featured vendors, show its richer profile; otherwise fall
// back to a generic card built from just the name. Both paths render the
// same shape, so swapping to a real GET /api/vendors/:slug later only
// changes where this data comes from.
export default function VendorCard({ vendorName }) {
  const vendor = FEATURED_VENDORS.find((v) => v.name === vendorName);

  return (
    <div className="rounded-xl border border-base-border bg-base-surface p-5">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-soil/10 text-soil">
          <Store className="h-5 w-5" strokeWidth={1.5} />
        </div>
        <div>
          <p className="font-display text-sm font-semibold text-ink">
            {vendorName}
          </p>
          {vendor ? (
            <Rating
              value={vendor.rating}
              count={vendor.productCount}
              size="sm"
              className="mt-0.5"
            />
          ) : (
            <p className="text-xs text-ink-muted">Vendor on Sprout</p>
          )}
        </div>
      </div>
      <p className="mt-3 text-sm text-ink-muted">
        {vendor?.tagline ??
          "This vendor hasn\u2019t added a shop description yet."}
      </p>
    </div>
  );
}
