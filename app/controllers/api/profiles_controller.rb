class Api::ProfilesController < ApplicationController
  skip_before_action :authenticate_user!
  before_action :check_authenticate_user!, only: [:update]
  before_action :set_profile, only: [:update]
  

  def show
    profile = User.includes(:profile).find_by(name: params[:user_name]).profile
    render json: profile, status: :ok
  end

  def update
    if @profile.update(profile_params)
      render json: { message: '更新しました。', profile: @profile }, status: :ok
    else
      render json: @profile.errors.full_messages, status: :unprocessable_entity
    end
  end

  def user_posts
    user = User.find_by(name: params[:user_name])
    user_post = Post.includes(:user, :shop, :likes).where(user_id: user.id)
    render json: user_post, include: [:user, :shop, :likes], status: :ok
  end

  private

  def profile_params
    params.require(:profile).permit(:avatar, :bio)
  end

  def authorize_user!
    render json: '権限がありません。', status: :forbidden unless @profile.user_id == current_user.id
  end

  def check_authenticate_user!
    render json: 'ログインしてください' , status: :unauthorized unless current_user
  end

  def set_profile
    @profile = current_user.profile
  end
end
