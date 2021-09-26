module Api
  module V1
    class MealsController < ApplicationController
      before_action :set_meal, only: %i[ update destroy ]

      # POST /meals or /meals.json
      def create
        # なんか最適化できそう
        @meal = Meal.new(meal_params)

        respond_to do |format|
          if @meal.save
            format.json { render :show, status: :created, location: @meal }
          else
            format.json { render json: {}, status: :unprocessable_entity }
          end
        end
      end

      # PATCH/PUT /meals/1 or /meals/1.json
      def update
        respond_to do |format|
          # TODO: 食べ物削除を考慮(削除フラグつけたりするやつ)
          if @meal.update(meal_params)
            format.json { render :show, status: :ok, location: @meal }
          else
            format.html { render :edit, status: :unprocessable_entity }
          end
        end
      end

      # DELETE /meals/1 or /meals/1.json
      def destroy
        @meal.destroy
        respond_to do |format|
          format.json { head :no_content }
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
          parmit_params = params.permit(:title, :description, dishes: [:id, :title, :description, :image, :_destroy])
          {
            user: current_user,
            title: parmit_params[:title],
            description: parmit_params[:description],
            dishes_attributes: parmit_params[:dishes]
          }
        end
    end
  end
end
