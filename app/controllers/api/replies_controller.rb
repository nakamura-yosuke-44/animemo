class Api::RepliesController < ApplicationController
  skip_before_action :authenticate_user! # deviseのメソッドをスキップ
  before_action :check_authenticate_user!, except: [:index]
  before_action :set_reply, only: [:destroy]
  before_action :authorize_user!, only: [:destroy]

  def index
    replies = Comment.includes({ user: { profile: {} } }).where(parent_id: params[:comment_id])
    render json: replies, include: {
      user: { include: :profile },
    }, status: :ok
  end
  
  def create
    reply = current_user.comments.new(reply_params)
    if reply.save
      render json: reply, status: :created
    else
      render json: { error: reply.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    if @reply.destroy
      render json: { message: '削除しました。' }, status: :ok
    else
      render json: { error: @reply.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def reply_params
    params.require(:reply).permit(:body, :post_id, :parent_id)
  end

  def check_authenticate_user!
    render json: { error: 'ログインしてください' }, status: :unauthorized unless current_user
  end

  def set_reply
    @reply = Comment.find_by(id: params[:replyId])
  end

  def authorize_user!
    render json: { error: '権限がありません。' }, status: :forbidden unless @reply.user_id == current_user.id
  end
end
