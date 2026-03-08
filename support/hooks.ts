//✅ Quản lý vòng đời của browser, context, page cho từng Scenario
//✅ Đảm bảo mỗi test độc lập, sạch sẽ, không ảnh hưởng lẫn nhau

import { Before, After, BeforeAll, AfterAll } from '@cucumber/cucumber'; //Cung cấp hook (Before, After, ...) cho Cucumber
import { Browser, chromium } from 'playwright'; // Trình duyệt gốc của Playwright
import { CustomWorld } from './custom-world'; // imprort class CustomWorld từ file custom-world.ts, Class bạn tự định nghĩa để quản lý browser, page, loginPage

let browser: Browser; // Mục đích Dùng để giữ browser khởi tạo 1 lần duy nhất cho cả test suite. Đỡ tốn thời gian mở trình duyệt lại trong mỗi scenario

BeforeAll(async () => { // Mở trình duyệt 1 lần
    browser = await chromium.launch({
        headless: true, // Chạy ở chế độ không ẩn giao diện (headless: true thì không thấy gì)
        slowMo: 100, // 👁️ chạy chậm để nhìn thao tác
    });
});

Before(async function (this: CustomWorld) { // this: CustomWorld: this là instance của CustomWorld (tạo mới mỗi scenario)
    this.browser = browser; //Gán browser đã mở sẵn vào CustomWorld
    await this.init(); // Gọi method init() để tạo context, page, loginPage (bạn đã định nghĩa)

    // Nhờ có setWorldConstructor(CustomWorld), mỗi scenario nhận được một this riêng biệt.
    // gọi được vì `this` là instance của CustomWorld
});

// After(async function (this: CustomWorld) { // Cleanup sau mỗi Scenario
//     await this.close(); //Gọi hàm close() trong CustomWorld để đóng: → page, context, và giải phóng tài nguyên
// });

AfterAll(async () => { // Đóng trình duyệt duy nhất đã tạo ra từ đầu suite test
    await browser.close();
});
