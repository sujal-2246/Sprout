import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sprout, Heart, Menu } from "lucide-react";
import CategoriesDropdown from "../navigation/CategoriesDropdown";
import CartDrawer from "../cart/CartDrawer";
import NotificationsDropdown from "../navigation/NotificationsDropdown";
import UserMenu from "../navigation/UserMenu";
import ThemeToggle from "../ui/ThemeToggle";
import MobileMenu from "./MobileMenu";
import SearchBar from "../search/SearchBar";
import { useWishlist } from "../../contexts/WishlistContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { count: wishlistCount } = useWishlist();
  const [mobileOpen, setMobileOpen] = useState(false);

  // The navbar's search box always resolves to a fresh marketplace search —
  // it isn't wired directly to useProductFilters (that hook is owned by
  // MarketplacePage) so this same header works identically from every
  // route. Navigating while already on /marketplace still works correctly:
  // react-router just updates the query string MarketplacePage reads from.
  const handleSearch = (value) => {
    navigate(
      value
        ? `/marketplace?search=${encodeURIComponent(value)}`
        : "/marketplace",
    );
  };

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-base-border/80 bg-base/70 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-6 py-4">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            className="rounded-lg p-1.5 text-ink-muted hover:bg-base-raised hover:text-ink lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>

          <Link to="/" className="flex shrink-0 items-center gap-2">
            <Sprout className="h-5 w-5 text-sprout" strokeWidth={1.75} />
            <span className="font-display text-base font-semibold tracking-tight text-ink">
              Sprout
            </span>
          </Link>

          <nav className="hidden items-center lg:flex">
            <CategoriesDropdown />
            <Link
              to="/marketplace"
              className="rounded-lg px-3 py-2 text-sm text-ink-muted hover:bg-base-raised hover:text-ink transition-colors"
            >
              Marketplace
            </Link>
          </nav>

          <div className="ml-auto hidden max-w-md flex-1 md:block">
            <SearchBar value="" onChange={handleSearch} />
          </div>

          <div className="ml-auto flex items-center gap-1 md:ml-0">
            <Link
              to="/marketplace"
              aria-label={`Wishlist, ${wishlistCount} item${wishlistCount === 1 ? "" : "s"}`}
              className="relative hidden h-9 w-9 items-center justify-center rounded-lg text-ink-muted hover:bg-base-raised hover:text-ink transition-colors sm:flex"
            >
              <Heart className="h-4 w-4" />
              {wishlistCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-sprout px-1 text-[10px] font-semibold text-base">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <CartDrawer />
            <NotificationsDropdown />
            <ThemeToggle />
            <UserMenu />
          </div>
        </div>
      </header>

      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        onSearch={handleSearch}
      />
    </>
  );
}
