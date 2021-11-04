# frozen_string_literal: true

class UsersController < ApplicationController
  before_action :set_user, only: %i(show)

  # GET /users/1
  def show
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_user
    @user = User.includes(:meals).find(params[:id])
  end
end
