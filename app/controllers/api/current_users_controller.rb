class Api::CurrentUsersController < ApplicationController
  def show
    render json: current_user.id
  end
end
