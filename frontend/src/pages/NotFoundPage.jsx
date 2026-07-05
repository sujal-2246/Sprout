import { Link } from "react-router-dom";
import { Sprout } from "lucide-react";
import Button from "../components/ui/Button";

export default function NotFoundPage() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center gap-4 px-6 py-24 text-center">
      <Sprout className="h-10 w-10 text-sprout" strokeWidth={1.25} />
      <h1 className="font-display text-2xl font-semibold text-ink">
        Page not found
      </h1>
      <p className="text-sm text-ink-muted">
        The page you're looking for doesn't exist, or the link may be out of
        date.
      </p>
      <Button as={Link} to="/" size="md">
        Back to home
      </Button>
    </div>
  );
}
