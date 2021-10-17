# frozen_string_literal: true

class TopController < ApplicationController
  def index
    @meals = Meal.includes(dishes: { thumbnail_image_attachment: :blob }).release.limit(10).order(created_at: :DESC)
  end
end
