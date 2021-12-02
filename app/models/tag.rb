# frozen_string_literal: true

# == Schema Information
#
# Table name: tags
#
#  id          :bigint           not null, primary key
#  count       :integer
#  display_top :boolean
#  name        :string(255)
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class Tag < ApplicationRecord
  has_many :meal_tags
  has_many :meals, through: :meal_tags
end
