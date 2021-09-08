# == Schema Information
#
# Table name: users
#
#  id                  :integer          not null, primary key
#  description         :text
#  display_name        :string           default(""), not null
#  email               :string
#  provider            :string
#  remember_created_at :datetime
#  uid                 :string
#  username            :string
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#
# Indexes
#
#  index_users_on_uid  (uid) UNIQUE
#
class User < ApplicationRecord
  devise :registerable, :rememberable, :omniauthable
end
