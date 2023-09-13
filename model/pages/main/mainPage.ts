import { chromium, Browser, Page } from "@playwright/test";
import { expect } from "@playwright/test";

// Import the CustomChecks class for custom functions
import { CustomChecks } from "../../helper/customChecks";

// Create an instance of the CustomChecks class
const customChecks = new CustomChecks();

// Define the MainPage class
class MainPage {
  browser: Browser;
  page: Page;
  url: any;
  solutions: any;
  platform_integrations: string;
  cookie_accept: string;
  cookie_tab: string;

  /**
   * Constructs a new instance of MainPage.
   */
  constructor() {
    this.url = "https://nuvei.com/";
    this.solutions = {
      main: "//a[@data-toggle='drop1']",
      Products: {
        platform_integrations: "//li[@id='menu-item-4868']",
      },
    };
    this.cookie_tab = '//div[@id="onetrust-button-group-parent"]';
    this.cookie_accept = '//button[@id="onetrust-accept-btn-handler"]';
  }

  /**
   * Navigates to the main page, waits for it to fully load, and accepts cookies.
   * @returns {Page} The Playwright page object for the main page.
   */
  async gotoMainPage() {
    this.browser = await chromium.launch();
    this.page = await this.browser.newPage();
    await this.page.goto(this.url, { timeout: 100000, waitUntil: "load" });

    // Wait for the page to fully load
    await customChecks.waitForFullLoad(this.page);

    // Accept cookies
    await this.acceptCookies();

    return this.page;
  }

  /**
   * Accepts cookies on the current page.
   */
  async acceptCookies() {
    try {
      await customChecks.checkElementToBeVisible(
        this.page,
        this.cookie_accept,
        false
      );
      await this.page.click(this.cookie_accept);
    } catch {
      console.log(`Element ${this.cookie_accept} is not visible`);
    }
  }

  /**
   * Checks if the current page URL matches a regular expression.
   * @param {any} url - The URL to match.
   * @param {RegExp} value - The regular expression to match against the URL.
   */
  async checkMainPageUrl(url: any, value: RegExp) {
    expect(url).toMatch(value);
  }

  /**
   * Navigates to the Solutions menu and selects Platform Integrations.
   */
  async doubleClick() {
    await this.page.click(this.solutions.main);
    await this.page.click(this.solutions.Products.platform_integrations);
  }
}

export { MainPage };
