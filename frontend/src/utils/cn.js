/**
 * Joins truthy class name fragments together, ignoring falsy ones
 * (undefined, null, false, ''). Lets components write conditional classes
 * like `cn('base-class', isActive && 'active-class')` without pulling in
 * clsx/classnames as a dependency for something this small.
 */
export function cn(...parts) {
  return parts.filter(Boolean).join(' ');
}
