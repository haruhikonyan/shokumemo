class TopController < ApplicationController
  def index
    @dishes = Dish.all
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
