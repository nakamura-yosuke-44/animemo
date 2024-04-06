require 'rails_helper'

RSpec.describe 'Shop', :js do
  describe 'アクセス時の挙動' do
    context 'データベースにある店舗のページにアクセス' do
      it '店舗情報のコンテンツがある' do
        shop = Shop.first
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
