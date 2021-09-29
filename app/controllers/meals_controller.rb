# frozen_string_literal: true

class MealsController < ApplicationController
  before_action :authenticate_user!, only: %i(new edit set_thumbnail_dish destroy)
  before_action :set_meal, only: %i(show edit destroy set_thumbnail_dish)
  before_action :set_is_my_meal, only: %i(show edit set_thumbnail_dish destroy)
  before_action :my_meal!, only: %i(edit set_thumbnail_dish destroy)

  # GET /meals or /meals.json
  # 検索結果ページになる？
  def index
    @meals = Meal.includes(dishes: { thumbnail_image_attachment: :blob }).release
  end

  # GET /meals/1 or /meals/1.json
  def show
    _render_404 if @meal.private && current_user != @meal.user
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
    redirect_to mypage_index_path, notice: "Meal was successfully destroyed."
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_meal
    @meal = Meal.find(params[:id])
  end

  def set_is_my_meal
    @is_my_meal = @meal.user == current_user
  end

  def my_meal!
    redirect_to root_path unless @is_my_meal
  end
end
