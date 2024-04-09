class Api::RelationshipsController < ApplicationController
  before_action :authenticate_user!

  # フォローするとき
  def create
    current_user.follow(params[:user_id])
    render json: { message: 'Followed successfully' }, status: :ok
  end

  # フォロー外すとき
  def destroy
    current_user.unfollow(params[:user_id])
    render json: { message: 'Unfollowed successfully' }, status: :ok
  end

  def followings
    user = User.find(params[:user_id])
    @users = user.followed_users
    render json: @users, status: :ok
  end
  
  # フォロワー一覧
  def followers
    user = User.find(params[:user_id])
    @users = user.followers
    render json: @users, status: :ok
  end
end
