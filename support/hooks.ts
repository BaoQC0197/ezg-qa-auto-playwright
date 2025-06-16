// support/hooks.ts
import { Before, After, BeforeAll, AfterAll } from '@cucumber/cucumber';
import { Browser, chromium } from 'playwright'; // ✅ đúng gói
import { CustomWorld } from './custom-world';

let browser: Browser;

BeforeAll(async () => {
    browser = await chromium.launch({
        headless: false,
        slowMo: 100,      // 👁️ chạy chậm để nhìn thao tác
    });
});

Before(async function (this: CustomWorld) {
    // Giả sử init() dùng browser bên ngoài
    this.browser = browser;
    await this.init();
});

After(async function (this: CustomWorld) {
    await this.close();
});

AfterAll(async () => {
    await browser.close();
});
