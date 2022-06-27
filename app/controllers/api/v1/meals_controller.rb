# frozen_string_literal: true

module Api
  module V1
    class MealsController < ApplicationController
      before_action :authenticate_user!, only: %i(create update destroy set_thumbnail_dish)
      before_action :set_meal, only: %i(update destroy set_thumbnail_dish)
      before_action :set_is_my_meal, only: %i(update destroy set_thumbnail_dish)
      before_action :my_meal!, only: %i(update destroy set_thumbnail_dish)

      # POST /meals or /meals.json
      def create
        # なんか最適化できそう
        @meal = Meal.new(meal_params)

        if @meal.save
          render :show, status: :created, location: @meal
        else
          render json: @meal.errors, status: :unprocessable_entity
        end
      end

      # PATCH/PUT /meals/1 or /meals/1.json
      def update
        if @meal.update(meal_params)
          render :show, status: :ok, location: @meal
        else
          render json: @meal.errors, status: :unprocessable_entity
        end
      end

      # DELETE /meals/1 or /meals/1.json
      def destroy
        @meal.destroy
        respond_to do |format|
          format.json { head :no_content }
        end
      end

      # PUT /meals/1/thumbnail_dish
      def set_thumbnail_dish
        dish = Dish.find(params[:dish_id])
        if @meal.dish_ids.include?(dish.id) && !dish.thumbnail_image.attached?
          return render json: { errors: '写真がありません' }, status: :unprocessable_entity
        end

        if @meal.update(thumbnail_dish: dish)
          render :show, status: :ok
        else
          render json: @meal.errors, status: :unprocessable_entity
        end
      end

      private

      # Use callbacks to share common setup or constraints between actions.
      def set_meal
        @meal = Meal.find(params[:id])
      end

      # Only allow a list of trusted parameters through.
      def meal_params
        # なんか最適化できそう
        if @meal.present?
          destroy_ids = @meal.dishes.pluck(:id) - params[:dishes].pluck(:id).map(&:to_i)
          if destroy_ids.present?
            params[:dishes].concat(
              destroy_ids.map do |id|
                { id: id, _destroy: 1 }
              end
            )
          end
        end
        parmit_params = params.permit(:title, :description, :scene, :private, :eaten_at, :location, dishes: [:id, :title, :description, :full_size_image, :thumbnail_image, :_destroy], tags: [:id, :name])
        {
          user: current_user,
          eaten_at: parmit_params[:eaten_at],
          title: parmit_params[:title],
          description: parmit_params[:description],
          location: parmit_params[:location],
          scene: parmit_params[:scene],
          # formData.append の仕様で文字列で送られてきてしまう
          private: parmit_params[:private] == 'true',
          dishes_attributes: parmit_params[:dishes],
          tags_attributes: parmit_params[:tags]
        }
      end

      def set_is_my_meal
        @is_my_meal = @meal.user == current_user
      end

      def my_meal!
        redirect_to root_path unless @is_my_meal
      end
    end
  end
end
