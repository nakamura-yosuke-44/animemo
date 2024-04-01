require 'rails_helper'

RSpec.describe 'UserRegistration', :js do
  before do
    visit new_user_registration_path
  end

  describe 'アカウント作成' do
    context '入力内容が正常' do
      it 'メール認証後アカウントが作成される' do
        fill_user_info
        expect(page).to have_content('本人確認用のメールを送信しました。メール内のリンクからアカウントを有効化させてください。')
        user = User.last
        token = user.confirmation_token
        visit user_confirmation_path(confirmation_token: token)
        expect(page).to have_text("メール認証完了。アカウントを作成しました。")
        expect(current_path).to eq(new_user_session_path)
      end
    end

    context '名前が未入力' do
      it 'アカウント作成が失敗' do
        fill_in 'user[name]', with: ''
        fill_in 'user[email]', with: 'user1@example.com'
        fill_in 'user[password]', with: 'password'
        fill_in 'user[password_confirmation]', with: 'password'
        find_by_id('user_agreement_terms').click
        click_on '登録'
        expect(page).to have_content('名前を入力してください')
        expect(current_path).to eq(new_user_registration_path)
      end
    end

    context 'メールが未入力' do
      it 'アカウント作成が失敗' do
        fill_in '名前', with: 'user1'
        fill_in 'メール', with: ''
        fill_in 'user[password]', with: 'password'
        fill_in 'user[password_confirmation]', with: 'password'
        find_by_id('user_agreement_terms').click
        click_on '登録'
        expect(page).to have_content('メールを入力してください')
        expect(current_path).to eq(new_user_registration_path)
      end
    end

    context 'パスワードが未入力' do
      it 'アカウント作成が失敗' do
        fill_in '名前', with: 'user1'
        fill_in 'メール', with: 'user1@example.com'
        fill_in 'user[password]', with: ''
        fill_in 'user[password_confirmation]', with: 'password'
        find_by_id('user_agreement_terms').click
        click_on '登録'
        expect(page).to have_content('パスワードを入力してください')
        expect(current_path).to eq(new_user_registration_path)
      end
    end

    context '入力パスワードが６文字未満' do
      it 'アカウント作成が失敗' do
        fill_in '名前', with: 'user1'
        fill_in 'メール', with: 'user1@example.com'
        fill_in 'user[password]', with: 'pass'
        fill_in 'user[password_confirmation]', with: 'pass'
        find_by_id('user_agreement_terms').click
        click_on '登録'
        expect(page).to have_content('パスワードは6文字以上で入力してください')
        expect(current_path).to eq(new_user_registration_path)
      end
    end

    context 'パスワードとパスワード（確認用）が不一致' do
      it 'アカウント作成が失敗' do
        fill_in '名前', with: 'user1'
        fill_in 'メール', with: 'user1@example.com'
        fill_in 'user[password]', with: 'paassword'
        fill_in 'user[password_confirmation]', with: 'tttttt'
        find_by_id('user_agreement_terms').click
        click_on '登録'
        expect(page).to have_content('パスワード（確認用）とパスワードの入力が一致しません')
        expect(current_path).to eq(new_user_registration_path)
      end
    end

    context 'すでに別のユーザーが登録しているメールを入力' do
      let!(:user) { create(:user) }

      it 'アカウント作成が失敗' do
        fill_in '名前', with: 'user1'
        fill_in 'メール', with: 'test3@example.com'
        fill_in 'user[password]', with: 'password'
        fill_in 'user[password_confirmation]', with: 'password'
        find_by_id('user_agreement_terms').click
        click_on '登録'
        expect(page).to have_content('メールはすでに存在します')
        expect(current_path).to eq(new_user_registration_path)
      end
    end

    context '利用規約とプライバシーポリシーへの同意が未チェック' do
      it 'アカウント作成が失敗' do
        fill_in '名前', with: 'user1'
        fill_in 'メール', with: 'user@example.com'
        fill_in 'user[password]', with: 'password'
        fill_in 'user[password_confirmation]', with: 'password'
        click_on '登録'
        expect(page).to have_content('利用規約とプライバシーポリシーに同意してください。')
        expect(current_path).to eq(new_user_registration_path)
      end
    end

    context '認証メールのリンクが期限切れ' do
      it 'リンクを押してもアカウント作成されず、認証メールの再送依頼を案内する' do
        fill_user_info
        expect(page).to have_content('本人確認用のメールを送信しました。メール内のリンクからアカウントを有効化させてください。')
        user = User.last
        token = user.confirmation_token
        travel_to 25.hours.after do
          visit user_confirmation_path(confirmation_token: token)
          expect(page).to have_text("メールの認証期限が切れています。新しくリクエストしてください。")
          expect(page).to have_field("メール", with: "user@example.com")
          click_on 'メール再送'
          expect(page).to have_content('アカウントの有効化について数分以内にメールでご連絡します。')
        end
      end
    end

    context '認証完了後、もう一度メールのリンクを押す' do
      it '認証済みであり、ログインするよう案内する' do
        fill_user_info
        expect(page).to have_content('本人確認用のメールを送信しました。メール内のリンクからアカウントを有効化させてください。')
        user = User.last
        token = user.confirmation_token
        visit user_confirmation_path(confirmation_token: token)
        visit user_confirmation_path(confirmation_token: token)
        expect(page).to have_content('メールは既に登録済みです。ログインしてください。')
        expect(page).to have_link('ログイン')
      end
    end
  end
end
