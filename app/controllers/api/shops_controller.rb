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
              Shop.all
            else
              Shop.includes(:stories).by_season(params[:season])
            end
    shops = shops.by_name(params[:name])
    shops = shops.by_prefecture(params[:prefecture])
    shops = shops.by_municipalities(params[:municipalities])
    render json: shops, include: :stories
  end
end
