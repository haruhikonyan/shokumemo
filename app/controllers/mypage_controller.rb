# frozen_string_literal: true

class MypageController < ApplicationController
  before_action :authenticate_user!, only: %i(index)
  def index
    @start_date = params[:start_date].presence || Time.zone.now.ago(1.month).strftime('%F')
    @end_date = params[:end_date].presence || Time.zone.now.strftime('%F')
    # TODO: N + 1
    @meals = current_user.meals.includes(dishes: { thumbnail_image_attachment: :blob })
      .filter_date_by(Time.zone.parse(@start_date), Time.zone.parse(@end_date))
  end
end
