import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import type { CustomWorld } from '../../support/custom-world';


// Scenario Outline: Failed login with invalid or expired OTP
//   When I fill in phone "0123456789"
//   And I input OTP code <otpType> "<otp>"
//   Then I should see an error message "<errorMessage>"

//   Examples:
//     | otpType    | otp    | errorMessage                        |
//     | is invalid | 000000 | Mã OTP không khớp, vui lòng nhập lại|
//     | is expired | 123456 | Mã OTP này đã hết hiệu lực. Vui lòng kiểm tra lại|


Given('I navigate the login page', async function (this: CustomWorld) {
  await this.loginPage.navigate();
});

When('I login with phone {string}', async function (this: CustomWorld, phone: string) {
  await this.loginPage.enterPhone(phone);
});

When('I input OTP code is valid {string}', async function (this: CustomWorld, otp: string) {
  await this.loginPage.enterOtp(otp);
});

Then('I should see the welcome message {string}', async function (this: CustomWorld, message: string) {
  await this.loginPage.isLoginSuccess(message);
});

// When(
//   /^I input OTP code (is valid|is invalid|is expired) "([^"]+)"$/,
//   async function (this: CustomWorld, otpType: string, otp: string) {
//     const loginPage = new LoginPage(this.page);

//     const isValid = otpType === 'is valid';
//     if (otpType === 'is valid') {
//       await loginPage.mockVerifyOtpSuccess();
//     } else if (otpType === 'is invalid') {
//       await loginPage.mockVerifyOtpFailure('Mã OTP không khớp, vui lòng nhập lại');
//     } else {
//       await loginPage.mockVerifyOtpFailure('Mã OTP này đã hết hiệu lực. Vui lòng kiểm tra lại');
//     }

//     // bỏ click, sử dụng enterOtp với flag valid/invalid
//     await loginPage.enterOtp(otp, isValid);
//   }
// );

// Then('I should see the welcome message {string}', async function (this: CustomWorld, message: string) {
//   // TODO: kiểm tra selector hiển thị welcome message
//   await expect(this.page.locator('.welcome-message')).toContainText(message);
// });

// Then('I should see an error message {string}', async function (this: CustomWorld, errorMessage: string) {
//   // TODO: kiểm tra selector hiển thị error message
//   await expect(this.page.locator('.error-message')).toHaveText(errorMessage);
// });
