class OmniauthCallbacksController < Devise::OmniauthCallbacksController
  def twitter
    # 認証データを元にデータベースでユーザーを探し、なければ作る。
    @user = User.from_omniauth(request.env["omniauth.auth"])
    if @user.persisted? # ユーザーがデータベース上に存在している。
      sign_in_and_redirect @user # ユーザーをsign_inする
      set_flash_message(:notice, :success, kind: __callee__.to_s.capitalize) if is_navigational_format?
    else # 何らかの理由でデータベースに保存されていない。
      session["devise.user_attributes"] = @user.attributes # 認証データを覚えておく。
      redirect_to new_user_registration_url(from_omniauth_callback: "１") # ユーザーを新規登録ページに転送。
    end
  end
end
