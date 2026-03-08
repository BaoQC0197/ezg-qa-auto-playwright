import { Page, expect } from '@playwright/test';
export class LoginPage {
  // Tinh dong giao - Access Modifier: private, default, pubic, protected
  constructor(public page: Page) {

  }

  async navigate() {
    await this.page.goto('https://d500vjs0cgrq8.cloudfront.net/login');
  }

  async enterPhone(phone: string) {
    await this.page.getByPlaceholder('Nhập số điện thoại đăng ký hồ sơ').fill(phone);
    await this.page.getByRole('button', { name: 'Đăng nhập' }).click();
  }

  async enterOtp(code: string) {
    await this.page.locator('input[placeholder="Nhập mã"]').fill(code);
  }

  async seeMessage(message: string) {
    await expect(
      this.page.getByText(message, { exact: true })
    ).toBeVisible({ timeout: 10000 });
  }
}
