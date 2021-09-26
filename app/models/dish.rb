# == Schema Information
#
# Table name: dishes
#
#  id          :integer          not null, primary key
#  description :text
#  title       :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  meal_id     :integer          not null
#
# Indexes
#
#  index_dishes_on_meal_id  (meal_id)
#
# Foreign Keys
#
#  meal_id  (meal_id => meals.id)
#
class Dish < ApplicationRecord
  belongs_to :meal
  
  has_one_attached :image
end
