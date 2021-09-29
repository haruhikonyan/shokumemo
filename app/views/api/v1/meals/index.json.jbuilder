# frozen_string_literal: true

json.array! @meals, partial: "api/v1/meals/meal", as: :meal
