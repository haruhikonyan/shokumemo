json.extract! meal, :id, :title, :description, :user_id, :created_at, :updated_at
json.url meal_url(meal, format: :json)
