import { setWorldConstructor, World, IWorldOptions } from '@cucumber/cucumber';
import { Browser, Page, BrowserContext, chromium } from 'playwright';
import { LoginPage } from '../pages/login.page';

export class CustomWorld extends World {
    browser!: Browser;
    context!: BrowserContext;
    page!: Page;
    loginPage!: LoginPage;

    constructor(options: IWorldOptions) {
        super(options);
    }

    async init() {
        this.context = await this.browser.newContext();
        this.page = await this.context.newPage();
        this.loginPage = new LoginPage(this.page); // ✅ Inject page object
    }

    async close() {
        await this.page?.close();
        await this.context?.close();
        await this.browser?.close();
    }
}

setWorldConstructor(CustomWorld);
