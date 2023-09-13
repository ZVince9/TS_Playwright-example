// required imports to execute commands
import { test } from "@playwright/test";
import { MainPage } from "../model/pages/main/mainPage";
import { PlatformIntegrationsPage } from "../model/pages/solutions/products/platformIntegrationsPage";
import { CustomChecks } from "../model/helper/customChecks";
import { data } from "../data/searchData";

import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

const mainPage = new MainPage();
const customChecks = new CustomChecks();
const platformIntegrationsPage = new PlatformIntegrationsPage();

test.describe.configure({ mode: "parallel" });

// making actions before each test block if needed
test.beforeEach(async () => {});

// making actions after each tests run
test.afterEach(async ({}, testInfo) => {
  if (testInfo.status === testInfo.expectedStatus) {
    console.log(`Passed ${testInfo.title} with status - ${testInfo.status}`);
  } else {
    console.log(`Failed ${testInfo.title} with status - ${testInfo.status}`);
  }
});

// test block
test(`Search for ${process.env.BIG_COMMERNCE} Partner`, async () => {
  let page = await mainPage.gotoMainPage();
  await mainPage.checkMainPageUrl(page.url(), /.*nuvei/);
  await mainPage.doubleClick();
  await platformIntegrationsPage.searchForPartner(page);
  await customChecks.expectTextToBeVisible(
    page,
    data.Search.title_text_variable,
    data.Search.title_text
  );
});
