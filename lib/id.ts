/**
 * Generate a unique id for list keys / preview items.
 *
 * `crypto.randomUUID()` only works in secure contexts (HTTPS or localhost).
 * Opening the app via LAN IP (e.g. http://192.168.x.x:3000) is not secure,
 * so we fall back to a simple client-side id.
 */
export function createId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 11)}`;
}
