/** HA websocket failures are usually plain objects, not Error instances. */
export function errorMessage(value: unknown, depth = 0): string {
  if (typeof value === "string" && value.trim()) return value;
  if (value && typeof value === "object" && depth < 4) {
    const e = value as Record<string, unknown>;
    if (typeof e.message === "string" && e.message.trim()) return e.message;
    for (const key of ["error", "cause"]) {
      if (e[key] && e[key] !== value) {
        const message = errorMessage(e[key], depth + 1);
        if (!message.startsWith("Onbekende Home Assistant-fout"))
          return message;
      }
    }
    if (typeof e.code === "string") return `Home Assistant-fout: ${e.code}`;
  }
  return "Onbekende Home Assistant-fout. Controleer het Home Assistant-logboek.";
}
