json.meal do
  json.extract! @meal, :id, :title, :description
  json.dishes do
    json.array! @meal.dishes do |dish|
      json.extract! dish, :id, :title, :description
    end
  end
end
