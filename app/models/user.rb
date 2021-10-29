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
  devise :registerable, :rememberable, :omniauthable, omniauth_providers: [:facebook, :twitter, :google_oauth2, :line]
  has_many :meals, dependent: :destroy

  def self.from_omniauth(auth)
    where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
      # TODO: auth の種類によっては email は取れない気がするのでどうにか
      user.email = auth.info.email
      user.display_name = '名無しタベルバマー'
    end
  end
end
