class Api::RepliesController < ApplicationController
  skip_before_action :authenticate_user!
  before_action :check_authenticate_user!, except: [:index]
  before_action :set_reply, only: [:destroy]

  def index
    replies = Comment.includes({ user: { profile: {} } }).where(parent_id: params[:comment_id])
    render json: replies, include: {
      user: { include: :profile }
    }, status: :ok
  end

  def create
    reply = current_user.comments.new(reply_params)
    comment = Comment.find(params[:reply][:parent_id])
    if reply.save
      comment.create_notification_reply!(current_user, reply.id)
      render json: { message: 'リプライしました。' }, status: :created
    else
      render json: reply.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    if @reply.destroy
      render json: { message: '削除しました。' }, status: :ok
    else
      render json: @reply.errors.full_messages, status: :unprocessable_entity
    end
  end

  private

  def reply_params
    params.require(:reply).permit(:body, :post_id, :parent_id)
  end

  def check_authenticate_user!
    render json: 'ログインしてください', status: :unauthorized unless current_user
  end

  def set_reply
    @reply = current_user.comments.find_by(id: params[:replyId])
  end
end
