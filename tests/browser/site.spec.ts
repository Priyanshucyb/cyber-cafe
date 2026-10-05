import { test, expect } from "@playwright/test";
const widths = [320, 375, 390, 430, 768, 1024, 1280, 1440];
for (const width of widths)
  test(`production page at ${width}px`, async ({ page }, testInfo) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    page.on("console", (m) => {
      if (m.type() === "error") errors.push(m.text());
    });
    page.on("response", (r) => {
      if (r.status() >= 400) errors.push(`${r.status()} ${r.url()}`);
    });
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await expect(page.locator("h1")).toHaveCount(1);
    await page.evaluate(() => document.fonts.ready);
    await expect(
      page.getByRole("button", { name: /Use .* theme/ }),
    ).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBeTruthy();
    if (width < 900) {
      const menu = page.locator(".menu-toggle");
      await menu.click();
      await expect(menu).toHaveAttribute("aria-expanded", "true");
      await page.keyboard.press("Escape");
      await expect(menu).toBeFocused();
      await expect(menu).toHaveAttribute("aria-expanded", "false");
      await menu.click();
      await page
        .getByRole("navigation", { name: "Main navigation" })
        .getByRole("link", { name: "Services" })
        .click();
      await expect(menu).toHaveAttribute("aria-expanded", "false");
    }
    const row = page.locator(".service-row").first();
    await row.locator("summary").click();
    await expect(row).toHaveAttribute("open", "");
    await row.locator("summary").press("Enter");
    await expect(row).not.toHaveAttribute("open");
    const illustration = page.getByRole("button", {
      name: "Disconnect illustration",
    });
    await illustration.click();
    await expect(illustration).toHaveAttribute("aria-pressed", "false");
    for (const id of ["services", "about", "location", "contact"]) {
      await page.locator(`#${id}`).scrollIntoViewIfNeeded();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBeTruthy();
    }
    await page.getByRole("button", { name: /Use .* theme/ }).click();
    const theme = await page.locator("html").getAttribute("data-theme");
    await page.reload();
    await expect(page.locator("html")).toHaveAttribute("data-theme", theme!);
    await page.emulateMedia({ reducedMotion: "reduce" });
    expect(
      await page
        .locator("h1 span")
        .first()
        .evaluate((el) => getComputedStyle(el).animationName),
    ).toBe("none");
    await page.evaluate(() => {
      document
        .querySelectorAll(".reveal")
        .forEach((el) => el.classList.add("revealed"));
    });
    await page.screenshot({
      path: testInfo.outputPath(`page-${width}.png`),
      fullPage: true,
    });
    expect(errors).toEqual([]);
  });
test("pre-rendered content and services work with JavaScript disabled", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:4173");
  await expect(page.locator("h1")).toBeVisible();
  await page.locator(".service-row summary").first().click();
  await expect(page.locator(".service-detail").first()).toBeVisible();
  await context.close();
});
