# frozen_string_literal: true

module Api
  module V1
    # 仮 sucaffold そのまま置いている
    class TagsController < ApplicationController
      before_action :set_tag, only: %i(update destroy)

      # POST /api/v1/tages or /api/v1/tages.json
      def create
        @tag = Tag.new(tag_params)

        if @tag.save
          render :show, status: :created, location: @tag
        else
          render json: @tag.errors, status: :unprocessable_entity
        end
      end

      # PATCH/PUT /api/v1/tages/1 or /api/v1/tages/1.json
      def update
        if @tag.update(tag_params)
          render :update, status: :ok
        else
          render json: @tag.errors, status: :unprocessable_entity
        end
      end

      # DELETE /api/v1/tages/1 or /api/v1/tages/1.json
      def destroy
        @tag.destroy
        respond_to do |format|
          format.json { head :no_content }
        end
      end

      private

      # Use callbacks to share common setup or constraints between actions.
      def set_tag
        @tag = Tag.find(params[:id])
      end

      # Only allow a list of trusted parameters through.
      def tag_params
        params.require(:tag).permit(:name)
      end
    end
  end
end
