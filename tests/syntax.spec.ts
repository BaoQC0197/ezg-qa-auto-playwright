import{test} from '@playwright/test'
test('checkloginpass', async ({ page }) => {
    await test.step('Step 1: Go to login page', async () => {
        await page.goto('https://d500vjs0cgrq8.cloudfront.net/login');
    });
    await test.step('Step 2: Fill in phone number', async () => {
        await page.fill('#phone-input', '0123456789');
        await page.click('#request-otp-btn');
    }
    );
    await test.step('Step 3: Enter OTP code', async () => {
        await page.fill('#otp-input','123456');    
}); 
});