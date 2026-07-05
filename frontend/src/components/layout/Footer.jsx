import { Link } from 'react-router-dom';
import { Sprout } from 'lucide-react';
import { CATEGORIES } from '../../data/categories';

const LINK_COLUMNS = [
  {
    heading: 'Shop',
    links: [
      { label: 'Marketplace', to: '/marketplace' },
      ...CATEGORIES.map((c) => ({ label: c.label, to: `/marketplace?category=${c.slug}` })),
    ],
  },
  {
    heading: 'Vendors',
    links: [
      { label: 'Become a vendor', to: '/marketplace' },
      { label: 'Vendor guidelines', to: '/marketplace' },
      { label: 'Featured shops', to: '/' },
    ],
  },
  {
    heading: 'Support',
    links: [
      { label: 'Help center', to: '/' },
      { label: 'Shipping & returns', to: '/' },
      { label: 'Contact us', to: '/' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-base-border bg-base-surface/50">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <Link to="/" className="flex items-center gap-2">
              <Sprout className="h-5 w-5 text-sprout" strokeWidth={1.75} />
              <span className="font-display text-base font-semibold text-ink">Sprout</span>
            </Link>
            <p className="mt-3 max-w-xs text-sm text-ink-muted">
              A marketplace for vendors who care about the details — and shoppers who notice them.
            </p>
          </div>

          {LINK_COLUMNS.map((col) => (
            <div key={col.heading}>
              <p className="font-display text-xs font-semibold uppercase tracking-wider text-ink-muted">
                {col.heading}
              </p>
              <ul className="mt-3 flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="text-sm text-ink-muted hover:text-sprout transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-base-border pt-6 text-xs text-ink-faint sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Sprout Marketplace. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/" className="hover:text-ink-muted">Privacy</Link>
            <Link to="/" className="hover:text-ink-muted">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
