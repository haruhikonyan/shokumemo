# frozen_string_literal: true

json.meal do
  json.partial! "models/meal", meal: @meal
end
json.is_my_meal @is_my_meal
