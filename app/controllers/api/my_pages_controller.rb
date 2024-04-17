class Api::MyPagesController < ApplicationController
  def my_list
    status = params[:status]
    case status
    when 'went', 'want_to', 'pending'
      list = Visit.where(user_id: current_user.id, status:).includes(:shop)
      render json: list, include: [:shop]
    else
      render json: 'Invalid status parameter', status: :unprocessable_entity
    end
  rescue ActiveRecord::RecordNotFound => e
    render json: 'Record not found', status: :not_found
  end
end
