// 2. hooks.ts
// Mục đích: Chứa các hooks (BeforeAll, AfterAll, Before, After) để:

// BeforeAll: khởi chạy browser một lần trước toàn bộ suite.

// AfterAll: đóng browser sau khi tất cả scenario chạy xong.

// Before: trước mỗi scenario, tạo mới một BrowserContext và Page.

// After: sau mỗi scenario, đóng page và context để tách biệt dữ liệu giữa các scenario.

// Tác dụng: Đảm bảo mỗi scenario chạy trong môi trường sạch, không bị “dính” dữ liệu của scenario khác, và giúp tiết kiệm tài nguyên bằng việc không phải launch browser liên tục.





// CAU HOI:
// 1. Tại sao cách này bị lỗi:
// import { BeforeAll, AfterAll, Before, After } from '@cucumber/cucumber';
// import { chromium } from 'playwright';
// import { CustomWorld } from './custom-world';

// BeforeAll(async function (this: CustomWorld) {
//   this.browser = await chromium.launch({ headless: true });
// });

// Before(async function (this: CustomWorld) {
//   this.context = await this.browser.newContext();
//   this.page = await this.context.newPage();
// });

// After(async function (this: CustomWorld) {
//   await this.page.close();
//   await this.context.close();
// });

// AfterAll(async function (this: CustomWorld) {
//   await this.browser.close();
// });

// support/hooks.ts
import { BeforeAll, AfterAll, Before, After } from '@cucumber/cucumber';
import { chromium, Browser } from 'playwright';
import { CustomWorld } from './custom-world';

let browser: Browser;

// Chạy một lần trước tất cả scenario
BeforeAll(async () => {
    browser = await chromium.launch({ headless: true });
});

// Chạy một lần sau khi hết tất cả scenario
AfterAll(async () => {
    await browser.close();
});

// Chạy trước mỗi scenario, tạo context và page mới
Before(async function (this: CustomWorld) {
    this.context = await browser.newContext();
    this.page = await this.context.newPage();
});

// Chạy sau mỗi scenario, đóng context và page
After(async function (this: CustomWorld) {
    await this.page.close();
    await this.context.close();
});
