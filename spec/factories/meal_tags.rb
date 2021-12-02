# frozen_string_literal: true

# == Schema Information
#
# Table name: meal_tags
#
#  id         :bigint           not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  meal_id    :bigint
#  tag_id     :bigint
#
# Indexes
#
#  index_meal_tags_on_meal_id  (meal_id)
#  index_meal_tags_on_tag_id   (tag_id)
#
FactoryBot.define do
  factory :meal_tag do
    meal
    tag
  end
end
