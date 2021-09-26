module Api
  module V1
    # 仮 sucaffold そのまま置いている
    class DishesController < ApplicationController
      before_action :set_dish, only: %i[ update destroy ]

      # POST /api/v1/dishes or /api/v1/dishes.json
      def create
        @dish = Dish.new(dish_params)

        respond_to do |format|
          if @dish.save
            format.json { render :show, status: :created, location: @dish }
          else
            format.json { render json: @dish.errors, status: :unprocessable_entity }
          end
        end
      end

      # PATCH/PUT /api/v1/dishes/1 or /api/v1/dishes/1.json
      def update
        respond_to do |format|
          if @dish.update(dish_params)
            format.json { render :show, status: :ok, location: @dish }
          else
            format.json { render json: @dish.errors, status: :unprocessable_entity }
          end
        end
      end

      # DELETE /api/v1/dishes/1 or /api/v1/dishes/1.json
      def destroy
        @dish.destroy
        respond_to do |format|
          format.json { head :no_content }
        end
      end

      private
        # Use callbacks to share common setup or constraints between actions.
        def set_dish
          @dish = Dish.find(params[:id])
        end

        # Only allow a list of trusted parameters through.
        def dish_params
          params.require(:dish).permit(:title, :description, :meal_id, :image)
        end
    end
  end
end
