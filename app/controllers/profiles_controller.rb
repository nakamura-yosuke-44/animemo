class ProfilesController < ApplicationController
  def show
    @user = User.find_by(name: params[:user_name])
    if @user
      @user_name = @user.name
    else
      redirect_to root_path, alert: "プロフィール画面を表示できません"
    end
  end
end
