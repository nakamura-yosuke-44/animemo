class Api::MyPagesController < ApplicationController
  def my_list
    current_user_id = current_user.id
    begin
      status = params[:status]
      case status
      when 'went'
        went_list = Visit.where(user_id: current_user_id, status: 'went').includes(:shop)
        render json: went_list, include: [:shop]
      when 'want_to'
        want_list = Visit.where(user_id: current_user_id, status: 'want').includes(:shop)
        render json: want_list, include: [:shop]
      when 'pending'
        pending_list = Visit.where(user_id: current_user_id, status: 'pending').includes(:shop)
        render json: pending_list, include: [:shop]
      else
        render json: { error: 'Invalid status parameter' }, status: :unprocessable_entity
      end
    rescue StandardError => e
      render json: { error: e.message }, status: :internal_server_error
    end
  end
end
