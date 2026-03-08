Feature: Login

  Background:
    Given I navigate the login page

  Scenario: Successful login
    When I login with phone "0765432145"
    And I input "success" OTP "111111"
    Then I should see the message "Hồ sơ của bạn"

  Scenario Outline: Failed login with OTP error
    When I login with phone "0765432145"
    And I input "<otpType>" OTP "<otp>"
    Then I should see the message "<errorMessage>"

    Examples:
      | otpType | otp    | errorMessage                                 |
      | invalid | 000000 | Mã OTP không khớp, vui lòng nhập lại         |
      | expired | 123123 | Mã OTP này đã hết hiệu lực. Vui lòng kiểm tra lại |

  Scenario: Phone not registered
    When I login with unregistered phone "0000000000"
    Then I should see the message "Số điện thoại này chưa được đăng ký, vui lòng kiểm tra lại"
