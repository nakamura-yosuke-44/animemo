class Api::CurrentUsersController < ApplicationController
  skip_before_action :authenticate_user!

  def show
    if current_user
      user_data = {
        id: current_user.id,
        likes: current_user.likes,
        followings: current_user.followings
      }
      render json: user_data
    else
      render json: '', status: :ok
    end
  end
end
