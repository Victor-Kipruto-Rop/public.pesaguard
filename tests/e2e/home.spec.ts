import { test, expect } from "@playwright/test";

test("home has an accessible main heading", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Know where every transaction stands");
});

test("Get started CTAs lead to the tenant application", async ({ page }) => {
  await page.goto("/");
  const ctas = page.getByRole("link", { name: /get started/i });
  await expect(ctas.first()).toHaveAttribute("href", "https://app.pesaguard.co.ke");
  await expect(ctas).toHaveCount(3);
});
