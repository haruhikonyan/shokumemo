class LoginController < ApplicationController
  def index
    redirect_to root_path if user_signed_in?
  end

  def kari_login
    user = User.first
    if user.nil?
      user = User.create
    end
    sign_in(user)
    redirect_to root_path
  end
end
