class Api::PostsController < ApplicationController
  skip_before_action :authenticate_user!
  before_action :check_authenticate_user!, except: [:index]
  before_action :set_post, only: [:update, :destroy]

  def index
    posts = Post.includes({ user: { profile: {} } }, :shop, :likes)
    render json: posts, include: {
      user: { include: :profile },
      shop: {},
      likes: {}
    }, status: :ok
  end

  def create
    post = current_user.posts.build(post_params)

    if post.save
      render json: { message: '投稿しました。' }, status: :ok
    else
      render json: post.errors.full_messages, status: :unprocessable_entity
    end
  end

  def update
    if @post.update(post_params)
      render json: { message: '更新しました。' }, status: :ok
    else
      render json: @post.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    if @post.destroy
      render json: { message: '削除しました。' }, status: :ok
    else
      render json: @post.errors.full_messages, status: :unprocessable_entity
    end
  end

  private

  def post_params
    params.require(:post).permit(:title, :body, :shop_id, :image)
  end

  def check_authenticate_user!
    render json: 'ログインしてください', status: :unauthorized unless current_user
  end

  def set_post
    @post = current_user.posts.find(params[:id])
  end
end
