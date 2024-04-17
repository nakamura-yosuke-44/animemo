class Api::CommentsController < ApplicationController
  skip_before_action :authenticate_user!
  before_action :check_authenticate_user!, except: [:index]
  before_action :set_comment, only: [:destroy]

  def index
    comments = Comment.includes({ user: { profile: {} } }).where(post_id: params[:postId], parent_id: nil)
    render json: comments, include: {
      user: { include: :profile }
    }, status: :ok
  end

  def create
    comment = current_user.comments.new(comment_params)
    if comment.save
      render json: { message: 'コメントしました。' }, status: :created
    else
      render json: comment.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    if @comment.destroy
      render json: { message: '削除しました。' }, status: :ok
    else
      render json: @comment.errors.full_messages, status: :unprocessable_entity
    end
  end

  private

  def comment_params
    params.require(:comment).permit(:body, :post_id)
  end

  def check_authenticate_user!
    render json: 'ログインしてください', status: :unauthorized unless current_user
  end

  def set_comment
    @comment = current_user.comments.find(params[:id])
  end
end
