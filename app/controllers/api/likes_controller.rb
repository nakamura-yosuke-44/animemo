class Api::LikesController < ApplicationController
  skip_before_action :authenticate_user!
  before_action :check_authenticate_user!

  def create
    like = current_user.likes.build(post_id: params[:postId])
    if like.save
      render json: { message: 'いいねしました。' }, status: :ok
    else
      render json: like.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    like = current_user.likes.find_by(post_id: params[:id])
    if like.destroy
      render json: { message: 'いいねを解除しました。' }, status: :ok
    else
      render json: like.errors.full_messages, status: :unprocessable_entity
    end
  end

  private

  def check_authenticate_user!
    render json: { error: 'ログインしてください' }, status: :unauthorized unless current_user
  end
end
