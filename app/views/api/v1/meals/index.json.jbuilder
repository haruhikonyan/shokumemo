# frozen_string_literal: true

json.array! @meals, partial: "models/meal", as: :meal
