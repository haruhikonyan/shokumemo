json.extract! dish, :id, :title, :description, :meal_id, :created_at, :updated_at
json.url dish_url(dish, format: :json)
