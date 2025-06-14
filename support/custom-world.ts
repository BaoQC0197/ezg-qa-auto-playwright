// 1. custom-world.ts
// Mục đích: Định nghĩa World class – đó là đối tượng chung (context) được truyền vào tất cả các step definitions dưới dạng this.

// Nội dung chính:

// Kế thừa từ World của Cucumber, thêm các property như browser, context, page.

// Cho phép bạn lưu reference tới trình duyệt, ngữ cảnh (browser context) và trang (page) để reuse trong các bước test.

// Tác dụng: Mỗi scenario sẽ được cấp một instance của CustomWorld, nên các step có thể truy cập this.page, this.browser dễ dàng.



//??????? VẪN KHÔNG HIỂU

// support/custom-world.ts

import { setWorldConstructor, World, IWorldOptions } from '@cucumber/cucumber';
import type { BrowserContext, Page } from 'playwright';

export class CustomWorld extends World {
    public context!: BrowserContext;
    public page!: Page;

    constructor(options: IWorldOptions) {
        super(options);
    }
}

setWorldConstructor(CustomWorld);

