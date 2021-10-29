# frozen_string_literal: true

# TODO: dishes が不要なシーンが出てきたら meal_with_dishes に改名する 
json.extract! meal, :id, :title, :description, :scene, :scene_label, :thumbnail_dish_id, :location
json.eaten_at meal.eaten_at&.strftime('%F')
json.is_private meal.private
json.card_thumbnail_image_url meal.thumbnail_image.present? ? url_for(meal.thumbnail_image.variant(resize_to_fill: [480, 480]).processed): nil
json.dishes do
  json.array! meal.dishes do |dish|
    json.extract! dish, :id, :title, :description
    json.full_size_image_url url_for(dish.full_size_image) if dish.full_size_image.attached?
    json.thumbnail_image_url url_for(dish.thumbnail_image) if dish.thumbnail_image.attached?
  end
end
