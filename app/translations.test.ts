import { t } from "./translations";

function collectBilinguals(obj: unknown, path = ""): string[] {
  const missing: string[] = [];
  if (typeof obj !== "object" || obj === null) return missing;
  const record = obj as Record<string, unknown>;
  if ("en" in record && "es" in record) {
    if (!record.en) missing.push(`${path}.en is empty`);
    if (!record.es) missing.push(`${path}.es is empty`);
    return missing;
  }
  for (const key of Object.keys(record)) {
    missing.push(...collectBilinguals(record[key], path ? `${path}.${key}` : key));
  }
  return missing;
}

describe("translations", () => {
  it("has no missing or empty en/es values", () => {
    const missing = collectBilinguals(t);
    expect(missing).toEqual([]);
  });
});
