// ✅ login.steps.ts (chỉ mock verify-otp, không mock check-phone)
import { Given, When, Then } from '@cucumber/cucumber';
import type { CustomWorld } from '../../support/custom-world';
import { mockLoginOtp } from '../../support/mock.service';

Given('I navigate the login page', async function (this: CustomWorld) {
  await this.login.navigate();
});

// ✅ Dùng API thật để kiểm tra số điện thoại đã đăng ký
When('I login with phone {string}', async function (this: CustomWorld, phone: string) {
  console.log('STEP MATCHED: login with phone');
  await this.login.enterPhone(phone);
});

// ✅ Chỉ mock verify-OTP
When('I input {string} OTP {string}', async function (this: CustomWorld, otpType: string, otp: string) {
  await mockLoginOtp(this.page, otpType as 'success' | 'invalid' | 'expired');
  await this.login.enterOtp(otp);
});

// ✅ Dùng cho cả thông báo thành công & thất bại
Then('I should see the message {string}', async function (this: CustomWorld, message: string) {
  await this.login.seeMessage(message);
});

// ✅ Không mock check-phone khi số chưa đăng ký → dùng API thật
When('I login with unregistered phone {string}', async function (this: CustomWorld, phone: string) {
  await this.login.enterPhone(phone);
});
