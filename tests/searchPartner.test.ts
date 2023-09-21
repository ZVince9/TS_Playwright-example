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

test.beforeEach(async () => {});

// eslint-disable-next-line no-empty-pattern
test.afterEach(async ({}, testInfo) => {
  if (testInfo.status === testInfo.expectedStatus) {
    console.log(`Passed ${testInfo.title} with status - ${testInfo.status}`);
  } else {
    console.log(`Failed ${testInfo.title} with status - ${testInfo.status}`);
  }
});

test(`Search for ${process.env.BIG_COMMERNCE} Partner`, async () => {
  const page = await mainPage.gotoMainPage();
  await mainPage.checkMainPageUrl(page.url(), /.*nuvei/);
  await mainPage.doubleSingleClickToNavigate();
  await platformIntegrationsPage.searchForPartner(page);
  await customChecks.expectTextToBeVisible(
    page,
    data.Search.title_text_variable,
    data.Search.title_text,
  );
});
