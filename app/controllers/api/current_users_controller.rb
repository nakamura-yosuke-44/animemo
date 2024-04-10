class Api::CurrentUsersController < ApplicationController
  skip_before_action :authenticate_user!

  def show
    id = current_user&.id
    render json: id
  end
end
