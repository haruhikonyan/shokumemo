class TopController < ApplicationController
  def index
    @meals = Meal.includes(dishes: { thumbnail_image_attachment: :blob }).release.limit(10)
  end
end
