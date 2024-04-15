class Api::PostsController < ApplicationController
  skip_before_action :authenticate_user! # deviseのメソッドをスキップ
  before_action :check_authenticate_user!, except: [:index]
  before_action :set_post, only: [:update, :destroy]
  before_action :authorize_user!, only: [:update, :destroy]

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
      render json: post, status: :created
    else
      render json: post.errors.full_messages, status: :unprocessable_entity
    end
  end

  def update
    if @post.update(post_params)
      render json: { message: '投稿内容を更新しました。' }, status: :ok
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
    render json: { error: 'ログインしてください' }, status: :unauthorized unless current_user
  end

  def set_post
    @post = Post.find(params[:id])
  end

  def authorize_user!
    render json: { error: '権限がありません。' }, status: :forbidden unless @post.user == current_user
  end
end
