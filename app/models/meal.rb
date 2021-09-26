# == Schema Information
#
# Table name: meals
#
#  id          :integer          not null, primary key
#  description :text
#  title       :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  user_id     :integer          not null
#
# Indexes
#
#  index_meals_on_user_id  (user_id)
#
# Foreign Keys
#
#  user_id  (user_id => users.id)
#
class Meal < ApplicationRecord
  belongs_to :user
  has_many :dishes
  accepts_nested_attributes_for :dishes, allow_destroy: true
  
  has_one_attached :image
end
