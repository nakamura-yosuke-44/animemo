class Api::CommentsController < ApplicationController
  skip_before_action :authenticate_user! # deviseのメソッドをスキップ
  before_action :check_authenticate_user!, except: [:index]
  before_action :set_comment, only: [:destroy]
  before_action :authorize_user!, only: [:destroy]

  def index
    comments = Comment.includes({ user: { profile: {} } }).where(post_id: params[:postId])
    render json: comments, include: {
      user: { include: :profile },
    }, status: :ok
  end
  
  
  def create
    comment = current_user.comments.new(comment_params)
    if comment.save
      render json: comment, status: :created
    else
      render json: { error: comment.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    if @comment.destroy
      render json: { message: '削除しました。' }, status: :ok
    else
      render json: { error: @comment.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def comment_params
    params.require(:comment).permit(:body, :post_id)
  end

  def check_authenticate_user!
    render json: { error: 'ログインしてください' }, status: :unauthorized unless current_user
  end

  def set_comment
    @comment = Comment.find(params[:id])
  end

  def authorize_user!
    render json: { error: '権限がありません。' }, status: :forbidden unless @comment.user == current_user
  end
end
