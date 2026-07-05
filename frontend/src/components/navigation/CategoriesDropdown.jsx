import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import Dropdown from "../ui/Dropdown";
import { CATEGORIES } from "../../data/categories";

export default function CategoriesDropdown() {
  return (
    <Dropdown
      align="left"
      panelClassName="w-72 p-2"
      trigger={
        <button
          type="button"
          className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm text-ink-muted hover:bg-base-raised hover:text-ink transition-colors"
        >
          Categories
          <ChevronDown className="h-3.5 w-3.5" />
        </button>
      }
    >
      {({ close }) => (
        <div className="flex flex-col">
          {CATEGORIES.map(({ slug, label, description, icon: Icon }) => (
            <Link
              key={slug}
              to={`/marketplace?category=${slug}`}
              onClick={close}
              className="flex items-start gap-3 rounded-lg p-3 hover:bg-base-raised transition-colors"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sprout/10 text-sprout">
                <Icon className="h-4 w-4" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-sm font-medium text-ink">{label}</p>
                <p className="text-xs text-ink-muted">{description}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </Dropdown>
  );
}
