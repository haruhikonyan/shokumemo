# frozen_string_literal: true

class LoginController < ApplicationController
  def index
    redirect_to root_path if user_signed_in?
  end
end
