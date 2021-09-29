class MypageController < ApplicationController
  before_action :authenticate_user!, only: %i[ index ]
  def index
    @meals = current_user.meals
  end
end
