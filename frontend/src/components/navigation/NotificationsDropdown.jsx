import { Bell, Package, Tag, Star } from "lucide-react";
import Dropdown from "../ui/Dropdown";

// Demo content only — there's no notifications table/endpoint yet. Kept
// isolated here (rather than in data/*.mock.js) since, unlike products or
// vendors, this list has no real counterpart to eventually swap in until
// an actual notifications/activity feed feature is designed.
const NOTIFICATIONS = [
  {
    icon: Package,
    text: "Your Trailhead Waterproof Boot order shipped",
    time: "2h ago",
  },
  {
    icon: Tag,
    text: "Keystroke Labs dropped prices on 3 items you viewed",
    time: "1d ago",
  },
  {
    icon: Star,
    text: "Northbend Audio just joined Sprout as a vendor",
    time: "3d ago",
  },
];

export default function NotificationsDropdown() {
  return (
    <Dropdown
      align="right"
      panelClassName="w-80"
      trigger={
        <button
          type="button"
          aria-label="Notifications"
          className="relative flex h-9 w-9 items-center justify-center rounded-lg text-ink-muted hover:bg-base-raised hover:text-ink transition-colors"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-sprout" />
        </button>
      }
    >
      <div className="border-b border-base-border px-4 py-3">
        <p className="font-display text-sm font-semibold text-ink">
          Notifications
        </p>
      </div>
      <div className="flex flex-col py-1">
        {NOTIFICATIONS.map((n, i) => (
          <div
            key={i}
            className="flex items-start gap-3 px-4 py-2.5 hover:bg-base-raised"
          >
            <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sprout/10 text-sprout">
              <n.icon className="h-3.5 w-3.5" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-sm text-ink">{n.text}</p>
              <p className="mt-0.5 text-xs text-ink-faint">{n.time}</p>
            </div>
          </div>
        ))}
      </div>
    </Dropdown>
  );
}
