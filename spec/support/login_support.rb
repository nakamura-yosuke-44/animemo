module LoginSupport
  def login_by_helper(user)
    sign_in user
  end

  def login_by_fill(user)
    visit new_user_session_path
    fill_in 'user_email', with: user.email
    fill_in 'user_password', with: 'password'
    find('input[name="commit"]').click
  end
end
