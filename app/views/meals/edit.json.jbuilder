# frozen_string_literal: true

json.meal do
  json.partial! "models/meal", meal: @meal
end
json.scene_label_and_values Meal.scene_label_and_values
json.is_initial_add_dish @is_initial_add_dish
