class MealsController < ApplicationController
  before_action :set_meal, only: %i[ show edit ]

  # GET /meals or /meals.json
  def index
    @meals = Meal.all
  end

  # GET /meals/1 or /meals/1.json
  def show
  end

  # GET /meals/new
  def new
    @meal = Meal.new
  end

  # GET /meals/1/edit
  def edit
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_meal
      @meal = Meal.find(params[:id])
    end
end
