class Api::ProfilesController < ApplicationController

  skip_before_action :authenticate_user! # deviseのメソッドをスキップ
  before_action :check_authenticate_user!, except: [:show]
  
  

  def update
    @profile = Profile.find(params[:id])
    if @profile.update(profile_params)
      render json: @profile, status: :ok
    else
      render json: @profile.errors, status: :unprocessable_entity
    end
  end

  def show
    profile = Profile.includes(:user).find(params[:id])
    render json: profile, include: :user, status: :ok
  end

  private

  def set_profile
    profile = Profile.find(params[:id])
  end

  def profile_params
    params.require(:profile).permit(:avatar, :bio) 
  end

  def check_authenticate_user!
    render json: { error: 'ログインしてください' }, status: :unauthorized unless current_user
  end

  def authorize_user!
    render json: { error: '権限がありません。' }, status: :forbidden unless @profile.user == current_user
  end
end
