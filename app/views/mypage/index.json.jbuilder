# frozen_string_literal: true

json.user do
  json.partial! "models/user", user: current_user
end
json.meals do
  json.array! @meals do |meal|
    json.partial! "models/meal", meal: meal
  end
end
