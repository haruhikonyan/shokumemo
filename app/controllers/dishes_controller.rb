# frozen_string_literal: true

class DishesController < ApplicationController
  before_action :set_dish, only: %i(show)

  # GET /dishes or /dishes.json
  def index
    @dishes = Dish.all
  end

  # GET /dishes/1 or /dishes/1.json
  def show
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_dish
    @dish = Dish.find(params[:id])
  end
end
