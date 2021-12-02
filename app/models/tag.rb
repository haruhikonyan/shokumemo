# frozen_string_literal: true

# == Schema Information
#
# Table name: tags
#
#  id          :bigint           not null, primary key
#  count       :integer          default(0), not null
#  display_top :boolean          default(FALSE), not null
#  name        :string(255)      not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class Tag < ApplicationRecord
  has_many :meal_tags
  has_many :meals, through: :meal_tags
end
