import { User, LogIn, UserPlus, Heart, Package } from "lucide-react";
import { Link } from "react-router-dom";
import Dropdown from "../ui/Dropdown";
import { useWishlist } from "../../contexts/WishlistContext";

// No auth system yet — this renders a signed-out menu. Once Phase 2 adds
// auth, swap the "Sign in / Create account" block for the signed-in
// version (profile, orders, sign out) based on a session value from a
// future AuthContext; the Dropdown/trigger shell doesn't need to change.
export default function UserMenu() {
  const { count } = useWishlist();

  return (
    <Dropdown
      align="right"
      panelClassName="w-56 p-1.5"
      trigger={
        <button
          type="button"
          aria-label="Account menu"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-ink-muted hover:bg-base-raised hover:text-ink transition-colors"
        >
          <User className="h-4 w-4" />
        </button>
      }
    >
      {({ close }) => (
        <div className="flex flex-col">
          <button
            type="button"
            onClick={close}
            className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm text-ink hover:bg-base-raised"
          >
            <LogIn className="h-4 w-4 text-ink-muted" /> Sign in
          </button>
          <button
            type="button"
            onClick={close}
            className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm text-ink hover:bg-base-raised"
          >
            <UserPlus className="h-4 w-4 text-ink-muted" /> Create account
          </button>
          <div className="my-1 border-t border-base-border" />
          <Link
            to="/marketplace"
            onClick={close}
            className="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-ink hover:bg-base-raised"
          >
            <span className="flex items-center gap-2.5">
              <Heart className="h-4 w-4 text-ink-muted" /> Wishlist
            </span>
            {count > 0 && (
              <span className="text-xs text-ink-faint">{count}</span>
            )}
          </Link>
          <button
            type="button"
            disabled
            className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm text-ink-faint"
          >
            <Package className="h-4 w-4" /> Orders (sign in required)
          </button>
        </div>
      )}
    </Dropdown>
  );
}
