require 'rails_helper'

RSpec.describe 'UserRegistration', :js do
  let!(:user) { create(:user) }

  before do
    user.confirm
    visit new_user_password_path
  end

  describe 'パスワードリセット' do
    context '有効期限内に正常に変更手続きを実行' do
      it 'パスワードが変更される' do
        fill_in '登録されているメール', with: 'test1@example.com'
        click_on 'パスワード再設定用リンクを送信'
        expect(page).to have_content('パスワードの再設定について数分以内にメールでご連絡いたします。')
        mail = ActionMailer::Base.deliveries.last
        expect(mail.to).to eq([user.email])
        token = mail.body.match(/reset_password_token=(.*)"/)[1]
        visit edit_user_password_path(reset_password_token: token)
        fill_in 'user[password]', with: 'editpass'
        fill_in 'user[password_confirmation]', with: 'editpass'
        click_on 'パスワードを変更する'
        expect(page).to have_content('パスワードが正しく変更されました。')
      end
    end

    context '有効期限が切れた状態で変更手続きを実行' do
      it 'パスワード変更失敗' do
        fill_in '登録されているメール', with: 'test2@example.com'
        click_on 'パスワード再設定用リンクを送信'
        expect(page).to have_content('パスワードの再設定について数分以内にメールでご連絡いたします。')
        mail = ActionMailer::Base.deliveries.last
        expect(mail.to).to eq([user.email])
        token = mail.body.match(/reset_password_token=(.*)"/)[1]
        travel_to 7.hours.after do
          visit edit_user_password_path(reset_password_token: token)
          fill_in 'user[password]', with: 'editpass'
          fill_in 'user[password_confirmation]', with: 'editpass'
          click_on 'パスワードを変更する'
          expect(page).to have_content('パスワードリセット用トークンの有効期限が切れました。新しくリクエストしてください。')
        end
      end
    end
  end
end
