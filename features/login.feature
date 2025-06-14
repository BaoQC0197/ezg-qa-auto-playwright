Feature: Login 

  Background:
    Given I open the login page

  Scenario: Successful login with mock PHONE & OTP
    When I fill in phone "0123456789"
    And I input OTP code is valid "123456"
    Then I should see the welcome message "Hồ sơ của bạn"

  Scenario Outline: Failed login with invalid or expired OTP
    When I fill in phone "0123456789"
    And I input OTP code <otpType> "<otp>"
    Then I should see an error message "<errorMessage>"

    Examples:
      | otpType    | otp    | errorMessage                        |
      | is invalid | 000000 | Mã OTP không khớp, vui lòng nhập lại|
      | is expired | 123456 | Mã OTP này đã hết hiệu lực. Vui lòng kiểm tra lại|

