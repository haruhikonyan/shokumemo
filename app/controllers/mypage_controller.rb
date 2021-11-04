# frozen_string_literal: true

class MypageController < ApplicationController
  before_action :authenticate_user!, only: %i(index)
  def index
    # TODO: N + 1
    @meals = current_user.meals.includes(dishes: { thumbnail_image_attachment: :blob })
  end
end
