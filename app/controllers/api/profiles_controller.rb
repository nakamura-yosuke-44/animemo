class Api::ProfilesController < ApplicationController
  skip_before_action :authenticate_user! # deviseのメソッドをスキップ
  before_action :set_profile, only: [:update, :show]
  before_action :authorize_user!, only: [:update]

  def show
    render json: { profile: @profile, user_name: params[:user_name] }, status: :ok
  end

  def update
    if @profile.update(profile_params)
      render json: @profile, status: :ok
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

  def set_profile
    @user = User.includes(:profile).find_by(name: params[:user_name])
    @profile = @user.profile
  end

  def profile_params
    params.require(:profile).permit(:avatar, :bio)
  end

  def authorize_user!
    render json: { error: '権限がありません。' }, status: :forbidden unless @profile.user_id == current_user.id
  end
end
