import { Page, expect } from '@playwright/test'; // không hiểu
// không hiểu
export class LoginPage {
  constructor(private page: Page) { }

  async navigate() {
    await this.page.goto('https://d500vjs0cgrq8.cloudfront.net/login'); // Tại sao không thấy kí tự => khi dùng arrow function
  }

  async enterPhone(phone: string) {
    await this.page.locator('#phone').fill(phone);
    await this.page.getByRole('button', { name: 'Đăng nhập' }).click();
  }

  async enterOtp(code: string) {
    await this.page.locator('input[placeholder="Nhập mã"]').fill(code);
  }

  async isLoginSuccess(message: string) {
    await expect(this.page.getByText(message, { exact: false })).toBeVisible();
  }

  async mockOtpLoginSuccess() {
    await this.page.route('**/api/auth/request-otp', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true, message: 'OTP sent' })
      });
    });

    await this.page.route('**/api/auth/verify-otp', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ token: 'mock-token', user: { name: 'admin' } })
      });
    });
  }
}
