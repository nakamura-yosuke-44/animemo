require 'rails_helper'

RSpec.describe 'SearchShop', :js do
  before do
    visit shops_path
    find('#seasonInput').click
    within('#autocomplete') do
      find('li', text: '全シーズン').click
    end
  end

  describe '店舗を条件検索' do
    context '店舗名入力フォームに登録されている店舗名に含まれない文字列を入力' do
      it '検索結果が見つからないメッセージが表示' do
        fill_in 'nameInput', with: 'aaaaa'
        expect(page).to have_content('条件に合う店舗は見つかりません。')
      end
    end

    context '都道府県入力フォームに登録されている都道府県に含まれない文字列を入力' do
      it '検索結果が見つからないメッセージが表示' do
        fill_in 'prefectureInput', with: 'aaaaa'
        expect(page).to have_content('条件に合う店舗は見つかりません。')
      end
    end

    context '市区町村入力フォームに登録されている市区町村に含まれない文字列を入力' do
      it '検索結果が見つからないメッセージが表示' do
        fill_in 'muniInput', with: 'aaaaa'
        expect(page).to have_content('条件に合う店舗は見つかりません。')
      end
    end

    context 'シーズン入力フォームにフォーカス' do
      it 'readonlyでタイプ入力できず、選択肢が表示される' do
        find('#seasonInput').readonly?
        find('#seasonInput').click
        expect(page).to have_css('#autocomplete li', count: 24)
      end
    end

    context 'シーズンで検索' do
      it '条件に設定したシーズンの店舗一覧が表示される' do
        find('#seasonInput').click
        within('#autocomplete') do
          find('li', text: 'Season3').click
        end
        expect(page).to have_content('検索結果：21件')
      end
    end

    context '店舗名をオートコンプリートで選択して検索' do
      it '条件に設定した店舗が表示される' do
        find('#nameInput').click
        within('#autocomplete') do
          find('li', text: '草花木果-SokaBokka-').click
        end
        expect(page).to have_content('検索結果：1件')
      end
    end

    context '店舗名をタイプ入力して検索' do
      it '条件に設定した店舗が部分一致で検索表示' do
        fill_in 'nameInput', with: '花木'
        expect(page).not_to have_content('花茶')
        expect(page).to have_content('草花木果-SokaBokka-')
      end

      it 'kana検索できる' do
        fill_in 'nameInput', with: 'そーか'
        expect(page).not_to have_content('花茶')
        expect(page).to have_content('草花木果-SokaBokka-')
      end
    end

    context '都道府県をオートコンプリートで選択して検索' do
      it '条件に設定した店舗が表示される' do
        find('#prefectureInput').click
        within('#autocomplete') do
          find('li', text: '埼玉県').click
        end
        expect(page).to have_content('秩父市')
        expect(page).not_to have_content('千葉県')
      end
    end

    context '都道府県をタイプ入力して検索' do
      it '条件に設定した店舗が部分一致で検索表示' do
        fill_in 'prefectureInput', with: '静'
        expect(page).to have_content('賀茂郡河津町')
        expect(page).not_to have_content('千葉県')
      end
    end

    context '市区町村をオートコンプリートで選択して検索' do
      it '条件に設定した店舗が表示される' do
        find('#muniInput').click
        within('#autocomplete') do
          find('li', text: '柏市').click
        end
        expect(page).to have_content('いづみ亭')
        expect(page).not_to have_content('東京都')
      end
    end

    context '市区町村をタイプ入力して検索' do
      it '条件に設定した店舗が部分一致で検索表示' do
        fill_in 'muniInput', with: '柏市'
        expect(page).not_to have_content('静岡県')
        expect(page).to have_content('いづみ亭')
      end
    end

    context '複合条件検索' do
      it '条件に設定した店舗が部分一致で検索表示' do
        find('#seasonInput').click
        within('#autocomplete') do
          find('li', text: 'Season10').click
        end
        find('#muniInput').click
        within('#autocomplete') do
          find('li', text: '新座市').click
        end
        expect(page).to have_content('ビストロKUROKAWA')
        expect(page).not_to have_content('Season3')
        expect(page).not_to have_content('川崎市')
      end
    end

    it '店舗名は店舗詳細ページへのリンクになっている' do
      shops_1 = Shop.first
      expect(page).to have_link(shops_1.name)
    end
  end
end
