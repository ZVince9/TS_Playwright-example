/* eslint-disable @typescript-eslint/no-explicit-any */
import { expect } from "@playwright/test";

// Import the MainPage and CustomChecks classes
import { MainPage } from "../../main/mainPage";
import { CustomChecks } from "../../../helper/customChecks";

// Import data for searching
import { data } from "../../../../data/searchData";

// Create instances of CustomChecks and MainPage
const customChecks = new CustomChecks();
const mainPage = new MainPage();

// Define the PlatformIntegrationsPage class
class PlatformIntegrationsPage {
  search: string;
  location_button: string;
  name_input: string;
  type: string;
  industry: string;
  location: string;
  card: string;

  constructor() {
    this.search = "//div[@class='section-partner-search']";
    this.location_button = "//button[@title='Location']";
    this.name_input = "//input[@class='form-control search-input']";
    this.type = "//select[@title='Partner Type']";
    this.industry = "//select[@title='Industry']";
    this.location = "//div[contains(@class,'search-dropdowns')]//div[3]";
    this.card = "//div[@class='ml-4']";
  }

  /**
   * Checks if platform elements are visible on the page.
   * @param {any} page - The Playwright page object.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async checkIfPlatformElementsAreVisible(page: any) {
    await mainPage.checkMainPageUrl(page.url(), /.*partner-integrations/);
    await customChecks.checkElementToBeVisible(page, this.search, false);
    await customChecks.checkElementToBeVisible(page, this.location, true);
  }

  /**
   * Searches for a partner on the page.
   * @param {any} page - The Playwright page object.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async searchForPartner(page: any) {
    await customChecks.waitForFullLoad(page);
    await this.checkIfPlatformElementsAreVisible(page);
    await this.searchForPartnerByName(page, data.Search.name);
    await this.selectTypeIndustryLocation(
      page,
      data.Search.type,
      data.Search.industry
    );
    await this.checkHowManyResultsAppeared(page, 4);
    await customChecks.scrollOnElement(page, this.card);
    await customChecks.selectElement(page, this.card, 3);
  }

  /**
   * Searches for a partner by name.
   * @param {any} page - The Playwright page object.
   * @param {string} name - The name of the partner to search for.
   */
  async searchForPartnerByName(page: any, name: string) {
    await page.fill(this.name_input, name);
  }

  /**
   * Selects partner type, industry, and location.
   * @param {any} page - The Playwright page object.
   * @param {string} type - The partner type to select.
   * @param {string} industry - The industry to select.
   */
  async selectTypeIndustryLocation(page: any, type: string, industry: string) {
    await page.selectOption(this.type, { label: type });
    await page.selectOption(this.industry, { label: industry });
    await page.click(this.location_button);
    for (let i = 0; i < data.Search.location.length; i++) {
      await page.click(
        `//span[contains(text(), "${data.Search.location[i]}")]`
      );
    }

    // Random clicking :))
    await page.mouse.click(10, 10);
  }

  /**
   * Checks how many partner results are displayed on the page.
   * @param {any} page - The Playwright page object.
   * @param {number} count - The expected number of results.
   */
  async checkHowManyResultsAppeared(page: any, count: number) {
    await this.checkIfPlatformElementsAreVisible(page);
    const visibleElementsCount = await page.$$eval(
      this.card,
      (elements: any) => {
        return elements.filter((element: any) => {
          const style = getComputedStyle(element);
          return style.display !== "none" && style.visibility !== "hidden";
        }).length;
      }
    );
    await expect(visibleElementsCount).toBe(count);
  }
}

export { PlatformIntegrationsPage };
