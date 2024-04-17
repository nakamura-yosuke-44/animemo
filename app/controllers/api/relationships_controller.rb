class Api::RelationshipsController < ApplicationController
  before_action :authenticate_user!

  def create
    if current_user.follow(params[:user_name])
      render json: { message: 'フォローしました。' }, status: :ok
    else
      render json:  { error: 'フォローできませんでした' }, status: :unprocessable_entity
    end
  end

  def destroy
    if current_user.unfollow(params[:user_name])
      render json: { message: 'フォロー解除しました。' }, status: :ok
    else
      render json:  { error: 'フォロー解除できませんでした' }, status: :unprocessable_entity
    end
  end

  def followings
    following = current_user.followings.includes(:profile)
    render json: following, include: :profile, status: :ok
  end
  
  def followers
    followers  = current_user.followers.includes(:profile)
    render json: followers, include: :profile, status: :ok
  end
end
