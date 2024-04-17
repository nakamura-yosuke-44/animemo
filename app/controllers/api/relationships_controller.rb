class Api::RelationshipsController < ApplicationController
  skip_before_action :authenticate_user!
  before_action :check_authenticate_user!

  def create
    if current_user.follow(params[:user_name])
      render json: { message: 'フォローしました。' }, status: :ok
    else
      render json: 'フォローできませんでした', status: :unprocessable_entity
    end
  end

  def destroy
    if current_user.unfollow(params[:user_name])
      render json: { message: 'フォロー解除しました。' }, status: :ok
    else
      render json: 'フォロー解除できませんでした', status: :unprocessable_entity
    end
  end

  def followings
    following = current_user.followings.includes(:profile)
    render json: following, include: :profile, status: :ok
  end

  def followers
    followers = current_user.followers.includes(:profile)
    render json: followers, include: :profile, status: :ok
  end

  private

  def check_authenticate_user!
    render json: 'ログインしてください', status: :unauthorized unless current_user
  end
end
