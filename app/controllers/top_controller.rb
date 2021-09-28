class TopController < ApplicationController
  def index
    @meals = Meal.includes(dishes: { thumbnail_image_attachment: :blob }).all
  end

  def kari_login
    user = User.first
    if user.nil?
      user = User.create
    end
    sign_in(user)
    redirect_to action: :index
  end
end
