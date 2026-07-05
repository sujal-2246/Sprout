import { ShoppingCart, X } from "lucide-react";
import Dropdown from "../ui/Dropdown";
import Button from "../ui/Button";
import { useCart } from "../../contexts/CartContext";
import { formatCurrency } from "../../utils/formatCurrency";

export default function CartDrawer() {
  const { items, itemCount, subtotal, removeItem } = useCart();

  return (
    <Dropdown
      align="right"
      panelClassName="w-80"
      trigger={
        <button
          type="button"
          aria-label={`Cart, ${itemCount} item${itemCount === 1 ? "" : "s"}`}
          className="relative flex h-9 w-9 items-center justify-center rounded-lg text-ink-muted hover:bg-base-raised hover:text-ink transition-colors"
        >
          <ShoppingCart className="h-4 w-4" />
          {itemCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-sprout px-1 text-[10px] font-semibold text-base">
              {itemCount}
            </span>
          )}
        </button>
      }
    >
      <div className="flex max-h-96 flex-col">
        <div className="border-b border-base-border px-4 py-3">
          <p className="font-display text-sm font-semibold text-ink">
            Your cart
          </p>
        </div>

        {items.length === 0 ? (
          <p className="px-4 py-8 text-center text-sm text-ink-muted">
            Your cart is empty.
          </p>
        ) : (
          <div className="flex-1 overflow-y-auto scrollbar-thin px-2 py-2">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-2 rounded-lg px-2 py-2 hover:bg-base-raised"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm text-ink">{item.title}</p>
                  <p className="text-xs text-ink-muted">
                    {item.quantity} × {formatCurrency(item.price)}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  aria-label={`Remove ${item.title} from cart`}
                  className="shrink-0 rounded-md p-1 text-ink-faint hover:bg-base-border hover:text-ink"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}

        {items.length > 0 && (
          <div className="border-t border-base-border p-4">
            <div className="mb-3 flex items-center justify-between text-sm">
              <span className="text-ink-muted">Subtotal</span>
              <span className="font-mono font-semibold text-ink">
                {formatCurrency(subtotal)}
              </span>
            </div>
            <Button variant="primary" className="w-full" size="md">
              Checkout
            </Button>
          </div>
        )}
      </div>
    </Dropdown>
  );
}
