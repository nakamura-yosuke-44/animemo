class Api::PostsController < ApplicationController
  skip_before_action :authenticate_user!
  before_action :check_authenticate_user!
  
  def create
    post = current_user.posts.build(post_params)
    
    if post.save
      render json: post, status: :created
    else
      render json: { errors: post.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def post_params
    params.require(:post).permit(:title, :body, :shop_id, :image)
  end

  def check_authenticate_user!
    unless current_user
      render json: { error: 'ログインしてください' }, status: :unauthorized
    end
  end
end
