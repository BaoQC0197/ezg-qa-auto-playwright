Feature: Login 

  Background:
    Given I navigate the login page

  Scenario: Successful login with mock PHONE & OTP
    When I login with phone "0123456789"
    And I input OTP code is valid "123456"
    Then I should see the welcome message "Tôi đồng ý tham gia chương trình Đánh giá khả năng chi trả EasyGop VePAP"
