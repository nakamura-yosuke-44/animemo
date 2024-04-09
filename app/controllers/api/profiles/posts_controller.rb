class Api::Profiles::PostsController < ApplicationController
  def index
    profile = Profile.find(params[:profile_id])
    posts = profile.user.posts
    render json: posts, include: [:user], status: :ok
  end
end
