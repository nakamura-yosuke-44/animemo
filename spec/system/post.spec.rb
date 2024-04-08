require 'rails_helper'

RSpec.describe 'Post', :js do
  describe '投稿機能' do
    context '正常値で投稿' do
      it '投稿が成功する' do
        visit
        visit shop_path(shop)
        expect(page).to have_content(shop.name)
        expect(page).to have_content(shop.food)
        expect(page).to have_link(shop.tabelog_url)
        expect(page).to have_css('iframe')
      end
    end

    context 'データベースにない店舗のIDでページリクエスト' do
      it 'アラートが出る' do
        visit 'http://localhost:3000/shops/0'
        accept_alert 'リクエストエラー' do
          expect(page).to have_content('確認中')
        end
      end
    end
  end
end