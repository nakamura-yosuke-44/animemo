class Api::ShopsController < ApplicationController
  skip_before_action :authenticate_user!

  def index
    data = Shop.includes(:stories).pluck('shops.prefecture', 'stories.season')
    arry_prefecture = data.map(&:first).uniq
    arry_season = data.map(&:last).uniq.unshift("全シーズン")
    render json: { arryPrefecture: arry_prefecture, arrySeason: arry_season }
  end

  def search
    shops = if params[:season] == "全シーズン"
              Shop.includes(:stories)
            else
              Shop.includes(:stories).by_season(params[:season])
            end
    shops = shops.by_name(params[:name])
    shops = shops.by_prefecture(params[:prefecture])
    shops = shops.by_municipalities(params[:municipalities])
    render json: shops, include: :stories
  end

  def show
    shop = Shop.includes(posts: [:user, :likes], stories: {}).find_by(id: params[:id])
  
    if shop
      render json: shop, include: { 
        posts: { include: [:user, :likes] },
        stories: {}
      }, status: :ok
    else
      render json: { error: '店舗が見つかりませんでした' }, status: :not_found
    end
  end

  def nearest
    user_location = [params[:latitude].to_f, params[:longitude].to_f]

    nearest_shop = Shop.near(user_location, 30).first # 10は検索する範囲（半径）を示します
    render json: nearest_shop
  end
end
