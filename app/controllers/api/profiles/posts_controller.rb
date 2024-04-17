class Api::Profiles::PostsController < ApplicationController
  skip_before_action :authenticate_user!
  
  def index
    profile = Profile.find(params[:profile_id])
    posts = profile.user.posts
    render json: posts, include: [:user], status: :ok
  end
end
