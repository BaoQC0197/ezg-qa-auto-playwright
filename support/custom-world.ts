import { setWorldConstructor, World, IWorldOptions } from '@cucumber/cucumber';
import { Browser, Page, BrowserContext, chromium } from 'playwright';
import { LoginPage } from '../pages/login.page';

export class CustomWorld extends World { //Tạo class CustomWorld kế thừa tất cả attribute và method của World 
    // Khai báo các thuộc tính chính cho class này
    browser!: Browser; // trình duyệt (toàn cục)
    context!: BrowserContext; // Môi trường độc lập cho mỗi scenario 
    page!: Page; // tab hiện tại
    login!: LoginPage;

    constructor(options: IWorldOptions) { // Đây là hàm đặc biệt trong class, được gọi tự động khi bạn tạo một đối tượng từ class đó
        super(options); // CustomWorld kế thừa từ World, nên phải gọi super() để khởi tạo World gốc
        // options là thông tin mà Cucumber truyền vào (ví dụ: scenario name, tags,...)
    }

    async init() {
        this.context = await this.browser.newContext();
        this.page = await this.context.newPage();
        this.login = new LoginPage(this.page); // ✅ Inject page object
    }

    async close() {
        await this.page?.close();
        await this.context?.close();
        await this.browser?.close();
    }
}

setWorldConstructor(CustomWorld);// Constructor sẽ được gọi tự động mỗi khi bắt đầu 1 Scenario, bởi dòng này:
