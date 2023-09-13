import { expect } from "@playwright/test";

class CustomChecks {
  constructor() {}

  /**
   * Waits for the page to fully load.
   * @param {any} page - The Playwright page object.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async waitForFullLoad(page: any) {
    await page.waitForLoadState("networkidle");
    await page.waitForLoadState("domcontentloaded");
    await page.waitForLoadState("load");
  }

  /**
   * Checks if an element is visible on the page.
   * @param {any} page - The Playwright page object.
   * @param {string} element - The selector of the element to check.
   * @param {boolean} value - Whether the element should be visible (true) or not (false).
   * @throws {Error} Throws an error if the element is not visible.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async checkElementToBeVisible(page: any, element: string, value: boolean) {
    try {
      if (element && value === true) {
        await page.waitForSelector(element, {
          state: "attached",
          timeout: 5000,
        });
      } else {
        await page.waitForSelector(element, {
          state: "visible",
          timeout: 5000,
        });
      }
    } catch (error) {
      throw new Error(`Element ${element} is not visible`);
    }
  }

  /**
   * Scrolls to a specified element on the page.
   * @param {any} page - The Playwright page object.
   * @param {string} selector - The selector of the element to scroll to.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async scrollOnElement(page: any, selector: string) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await page.$eval(selector, (element: any) => {
      element.scrollIntoView();
    });
  }

  /**
   * Selects an element on the page, optionally by index.
   * @param {any} page - The Playwright page object.
   * @param {string} selector - The selector of the element to select.
   * @param {number} number - (Optional) The index of the element to select.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async selectElement(page: any, selector: string, number: number) {
    if (number) {
      await page.click(`(${selector})[${number}]`);
    } else {
      await page.click(`${selector}`);
    }
  }

  /**
   * Expects a specified text to be visible within an element on the page.
   * @param {any} page - The Playwright page object.
   * @param {string} selector - The selector of the element containing the text.
   * @param {string} text - The text to expect.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async expectTextToBeVisible(page: any, selector: string, text: string) {
    await expect(await page.textContent(selector)).toBe(text);
  }
}

export { CustomChecks };
