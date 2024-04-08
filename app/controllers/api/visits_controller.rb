class Api::VisitsController < ApplicationController
  protect_from_forgery with: :null_session

  def show
    visit = Visit.find_by(user_id: params[:user_id], shop_id: params[:shop_id])
    render json: { status: visit&.status }
  end

  def update
    visit = Visit.find_or_initialize_by(user_id: params[:user_id], shop_id: params[:shop_id])
    visit.status = params[:status]

    if visit.save
      render json: { status: 'ステータスを更新しました' }
    else
      render json: { error: 'Failed to update status' }, status: :unprocessable_entity
    end
  end
end