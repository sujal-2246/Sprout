import { CATEGORIES } from '../../data/categories';

// Only renders fields serializeProduct() in backend/src/routes/products.js
// actually returns today (category, tags, vendor, stock). Once variants
// (size/color/switch) are exposed via the API, add a row here rather than
// inventing spec data the backend can't back up.
export default function ProductSpecs({ product }) {
  const categoryLabels = product.categories
    ?.map((slug) => CATEGORIES.find((c) => c.slug === slug)?.label ?? slug)
    .join(', ');

  const rows = [
    { label: 'Category', value: categoryLabels || '—' },
    { label: 'Tags', value: product.tags?.length ? product.tags.join(', ') : '—' },
    { label: 'Vendor', value: product.vendor },
    { label: 'Availability', value: product.stock > 0 ? `${product.stock} in stock` : 'Out of stock' },
  ];

  return (
    <dl className="divide-y divide-base-border rounded-xl border border-base-border bg-base-surface">
      {rows.map((row) => (
        <div key={row.label} className="flex items-center justify-between gap-4 px-5 py-3.5 text-sm">
          <dt className="text-ink-muted">{row.label}</dt>
          <dd className="text-right capitalize text-ink">{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}
