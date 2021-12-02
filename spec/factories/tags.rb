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
FactoryBot.define do
  factory :tag do
    name { "tag_name" }
    count { 1 }
  end
end
