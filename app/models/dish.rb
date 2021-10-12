# frozen_string_literal: true

# == Schema Information
#
# Table name: dishes
#
#  id          :bigint           not null, primary key
#  description :text(65535)
#  title       :string(255)
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  meal_id     :bigint           not null
#
# Indexes
#
#  index_dishes_on_meal_id  (meal_id)
#
# Foreign Keys
#
#  fk_rails_...  (meal_id => meals.id)
#
class Dish < ApplicationRecord
  belongs_to :meal

  has_one_attached :full_size_image
  has_one_attached :thumbnail_image
end
