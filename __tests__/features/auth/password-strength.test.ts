import { describe, expect, it } from "vitest";

import { strengthOf } from "@/features/auth/components/password-strength";

describe("strengthOf", () => {
  it("treats a short password as short and a long mixed one as strong", () => {
    expect(strengthOf("short")).toBe("short");
    expect(strengthOf("longpassword")).toBe("fair");
    expect(strengthOf("LongPassword1")).toBe("strong");
  });
});
