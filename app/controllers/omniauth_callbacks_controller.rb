class OmniauthCallbacksController < Devise::OmniauthCallbacksController
  skip_before_action :verify_authenticity_token, only: :twitter
  def twitter
    @user = User.from_omniauth(request.env["omniauth.auth"])
    if @user.persisted?
      sign_in_and_redirect @user
      set_flash_message(:notice, :success, kind: __callee__.to_s.capitalize) if is_navigational_format?
    else
      session["devise.user_attributes"] = @user.attributes
      redirect_to new_user_registration_url(from_omniauth_callback: "１")
    end
  end
end
