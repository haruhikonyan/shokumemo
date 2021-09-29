class MealsController < ApplicationController
  before_action :set_meal, only: %i[ show edit destroy set_thumbnail_dish ]

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

  # POST /meals/1/thumbnail_dish
  def set_thumbnail_dish
    dish = Dish.find(params[:dish_id])
    if @meal.dish_ids.include?(dish.id) && !dish.thumbnail_image.attached?
      return redirect_to @meal, notice: "写真がありません"
    end

    @meal.update(thumbnail_dish: dish)
    redirect_to @meal
  end

  # DELETE /meals/1 or /meals/1.json
  def destroy
    @meal.destroy
    redirect_to meals_url, notice: "Meal was successfully destroyed."
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_meal
      @meal = Meal.find(params[:id])
    end
end
