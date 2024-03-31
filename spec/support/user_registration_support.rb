module UserRegistrationSupport
  def fill_user_info
    fill_in 'user[name]', with: 'user'
    fill_in 'user[email]', with: 'user@example.com'
    fill_in 'user[password]', with: 'password'
    fill_in 'user[password_confirmation]', with: 'password'
    find_by_id('user_agreement_terms').click
    click_on '登録'
  end
end
