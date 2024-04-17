class Api::VisitsController < ApplicationController
  skip_before_action :authenticate_user!
  before_action :check_authenticate_user!, only: [:update]

  def show
    visit = Visit.find_by(user_id: params[:user_id], shop_id: params[:shop_id])
    if visit
      render json: { status: visit.status }
    else
      render json: { status: '' }
    end
  end

  def update
    visit = current_user.visits.find_or_initialize_by(user_id: params[:user_id], shop_id: params[:shop_id])
    visit.status = params[:status]

    if visit.save
      render json: { message: 'ステータスを更新しました' }, status: :ok
    else
      render json: visit.errors.full_messages , status: :unprocessable_entity
    end
  end

  private

  def check_authenticate_user!
    render json: 'ログインしてください' , status: :unauthorized unless current_user
  end
end
