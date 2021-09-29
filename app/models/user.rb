# frozen_string_literal: true

# == Schema Information
#
# Table name: users
#
#  id                  :bigint           not null, primary key
#  description         :text(65535)
#  display_name        :string(255)      default(""), not null
#  email               :string(255)
#  provider            :string(255)
#  remember_created_at :datetime
#  uid                 :string(255)
#  username            :string(255)
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#
# Indexes
#
#  index_users_on_uid  (uid) UNIQUE
#
class User < ApplicationRecord
  devise :registerable, :rememberable, :omniauthable, omniauth_providers: [:facebook, :twitter, :google, :line]
  has_many :meals, dependent: :destroy
end
