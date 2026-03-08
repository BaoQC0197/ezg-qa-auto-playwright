import { Page } from '@playwright/test';

export async function mockLoginOtp(page: Page, mode: 'success' | 'invalid' | 'expired') {
    await page.route('**/profiles/login', async (route) => {

        if (mode === 'invalid') {
            return route.fulfill({
                status: 401,
                contentType: 'application/json',
                body: JSON.stringify({
                    success: false,
                    message: 'Mã OTP không khớp, vui lòng nhập lại',
                }),
            });
        }

        if (mode === 'expired') {
            return route.fulfill({
                status: 410,
                contentType: 'application/json',
                body: JSON.stringify({
                    success: false,
                    message: 'Mã OTP này đã hết hiệu lực. Vui lòng kiểm tra lại',
                }),
            });
        }

        // ✅ SUCCESS – mock cấu trúc giống hệt backend thật
        return route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({
                success: true,
                data: {
                    profiles: [
                        {
                            id: 8005,
                            full_name: "Trần Ngọc",
                            phone: "0765432145",
                            dob: "2025-03-26",
                            gender: "Nam",
                            id_card_number: "036189010999",
                            email: "ngoctaidhwar@gmail.com",
                            agree_term: 1,
                            papers: null,
                            pap_relationship: "Con",
                            pap_submitted_application_id: 2071,
                            coordination: "106.75218093079017,10.790797434204718",
                            accept_payment_status: "Đồng ý hỗ trợ chi trả",
                            scheme: "NONE",
                            status: "PROCESSING",
                            active_status: "ACTIVE"
                        }
                    ],
                    re_submit: false,
                    is_submitted_application: true,
                    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicGhvbmUiOiIwNzY1NDMyMTQ1Iiwic2Vzc2lvbl9pZCI6IjU4YTJmNGEzLTMzOTktNGNlNS1iYjU3LTQ4MGNmNzk4MGI0ZSIsImlhdCI6MTc2NTA4NzM0MSwiZXhwIjoxODUxNDg3MzQxfQ.G70QFgzXLnSn7t7pfClmSRdV7uZ_zvtm6bwWz7HGYDY",
                    refresh_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicGhvbmUiOiIwNzY1NDMyMTQ1Iiwic2Vzc2lvbl9pZCI6IjU4YTJmNGEzLTMzOTktNGNlNS1iYjU3LTQ4MGNmNzk4MGI0ZSIsImlhdCI6MTc2NTA4NzM0MSwiZXhwIjoxNzY3Njc5MzQxfQ.FSOsni8pQgT_xpckR4X9uKzfD0wSmCIcduK89Zd3q80",
                    session_id: "58a2f4a3-3399-4ce5-bb57-480cf7980b4e",
                    hospital: "Bệnh viện Đa khoa Quốc tế Vinmec Times City"
                }
            }),
        });
    });
}
