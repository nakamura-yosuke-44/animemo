require 'rails_helper'

RSpec.describe 'UserSessions', :js do
  let!(:user) { create(:user) }

  describe 'ログイン' do
    context 'フォームの入力値が正常' do
      it 'ログイン成功。ヘッダー切り替え。' do
        login_by_fill(user)
        expect(page).to have_current_path(root_path), 'トップページが表示されていません'
        expect(page).to have_content('ログインしました'), 'フラッシュメッセージが表示されていません'
        expect(page).to have_link('ログアウト'), 'ログイン前ヘッダーが表示されています'
      end
    end

    context 'emailが未入力' do
      it 'ログイン失敗' do
        visit new_user_session_path
        fill_in 'user_email', with: ''
        fill_in 'user_password', with: 'password'
        click_on 'ログイン'
        expect(page).to have_content('メールまたはパスワードが違います。')
      end
    end

    context 'パスワードが未入力' do
      it 'ログイン失敗' do
        visit new_user_session_path
        fill_in 'user_email', with: user.email
        fill_in 'user_password', with: ''
        find('input[name="commit"]').click
        expect(page).to have_content('メールまたはパスワードが違います。')
      end
    end
  end

  describe 'ログアウト' do
    context 'ログアウトリンクを押す' do
      it 'ログアウト成功' do
        login_by_fill(user)
        expect(page).to have_content('ログインしました。')
        expect(page).to have_link('ログアウト'), 'ログアウトのリンクはありません'
        accept_confirm 'ログアウトしますか？' do
          click_on 'ログアウト'
        end
        expect(current_path).to eq(root_path), 'トップページではありません'
        expect(page).to have_content('ログアウトしました。'), 'フラッシュメッセージが表示されていません'
      end
    end

    context 'セッションタイムアウト' do
      it 'ログアウトする' do
        login_by_fill(user)
        expect(page).to have_content('ログインしました。')
        visit root_path
        travel 31.hours
        visit root_path
        expect(page).to have_content('セッションがタイムアウトしました')
      end
    end
  end
end
