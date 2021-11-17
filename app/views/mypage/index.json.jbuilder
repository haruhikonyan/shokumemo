# frozen_string_literal: true

json.user do
  json.partial! "models/user", user: current_user
end
json.meals do
  json.array! @meals do |meal|
    json.partial! "models/meal", meal: meal
  end
end
json.filter_query do
  json.start_date @start_date
  json.end_date @end_date
  json.search_word params[:search_word]
  json.scene params[:scene]
end
json.scene_label_and_values Meal.scene_label_and_values
