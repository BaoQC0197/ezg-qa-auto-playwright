import { Page } from '@playwright/test'; // không hiểu
// không hiểu
export class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('https://d500vjs0cgrq8.cloudfront.net/login'); // Tại sao không thấy kí tự => khi dùng arrow function
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

  async enterPhone(phone: string) {
    await this.page.fill('#phone-input', phone);
    await this.page.click('#request-otp-btn');
  }

  async enterOtp(code: string) {
    await this.page.fill('#otp-input', code);
    await this.page.click('#submit-otp-btn');
  }
}
