# frozen_string_literal: true

json.meal do
  json.extract! @meal, :id, :title, :description, :scene, :thumbnail_dish_id
  json.is_private @meal.private
  json.dishes do
    json.array! @meal.dishes do |dish|
      json.extract! dish, :id, :title, :description
      json.full_size_image_url url_for(dish.full_size_image) if dish.full_size_image.attached?
      json.thumbnail_image_url url_for(dish.thumbnail_image) if dish.thumbnail_image.attached?
    end
  end
end
json.scene_label_and_values Meal.scene_label_and_values
