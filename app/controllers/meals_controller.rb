# frozen_string_literal: true

class MealsController < ApplicationController
  before_action :authenticate_user!, only: %i(new edit destroy)
  before_action :set_meal, only: %i(show edit destroy)
  before_action :set_is_my_meal, only: %i(show edit destroy)
  before_action :my_meal!, only: %i(edit destroy)

  # GET /meals or /meals.json
  # 暫定検索結果ページ
  # 検索する単位は dish のほうがよさそう
  def index
    @search_params = params

    @meals = Meal.includes(dishes: { thumbnail_image_attachment: :blob }).order(updated_at: :desc)
    @meals = @meals.word_search(@search_params[:keyword]) if @search_params[:keyword]
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
    @is_initial_add_dish = params[:is_initial_add_dish].present?
  end

  # DELETE /meals/1 or /meals/1.json
  def destroy
    @meal.destroy
    redirect_to mypage_index_path, notice: "Meal was successfully destroyed."
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_meal
    @meal = Meal.includes(dishes: { thumbnail_image_attachment: :blob }).find(params[:id])
  end

  def set_is_my_meal
    @is_my_meal = @meal.user == current_user
  end

  def my_meal!
    redirect_to root_path unless @is_my_meal
  end
end
