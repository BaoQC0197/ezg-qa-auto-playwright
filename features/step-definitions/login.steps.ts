import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import type { CustomWorld } from '../../support/custom-world';

Given('I open the login page', async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page);
  await loginPage.mockRequestOtp();
  await loginPage.goto();
  await loginPage.goto();
});

When('I fill in phone {string}', async function (this: CustomWorld, phone: string) {
  const loginPage = new LoginPage(this.page);
  await loginPage.enterPhone(phone);
});

When(
  /^I input OTP code (is valid|is invalid|is expired) "([^"]+)"$/,
  async function (this: CustomWorld, otpType: string, otp: string) {
    const loginPage = new LoginPage(this.page);

    const isValid = otpType === 'is valid';
    if (otpType === 'is valid') {
      await loginPage.mockVerifyOtpSuccess();
    } else if (otpType === 'is invalid') {
      await loginPage.mockVerifyOtpFailure('Mã OTP không khớp, vui lòng nhập lại');
    } else {
      await loginPage.mockVerifyOtpFailure('Mã OTP này đã hết hiệu lực. Vui lòng kiểm tra lại');
    }

    // bỏ click, sử dụng enterOtp với flag valid/invalid
    await loginPage.enterOtp(otp, isValid);
  }
);

Then('I should see the welcome message {string}', async function (this: CustomWorld, message: string) {
  // TODO: kiểm tra selector hiển thị welcome message
  await expect(this.page.locator('.welcome-message')).toContainText(message);
});

Then('I should see an error message {string}', async function (this: CustomWorld, errorMessage: string) {
  // TODO: kiểm tra selector hiển thị error message
  await expect(this.page.locator('.error-message')).toHaveText(errorMessage);
});
