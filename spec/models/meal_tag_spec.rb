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
require 'rails_helper'

RSpec.describe MealTag, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
