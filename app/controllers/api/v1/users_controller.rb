# frozen_string_literal: true

module Api
  module V1
    class UsersController < ApplicationController
      before_action :authenticate_user!, only: %i(update)

      # PATCH/PUT /users/1
      def update
        if current_user.update(user_params)
          render :show, status: :ok
        else
          render json: current_user.errors, status: :unprocessable_entity
        end
      end

      private

      def user_params
        params.require(:user).permit(:email, :display_name, :description)
      end
    end
  end
end
