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

# factory_bot 導入に伴い、動作確認の為に作成しているfactory
# 使用する際は、factory内を修正した後、このコメントアウトを削除すること
FactoryBot.define do
  factory :user do
    username { "hoge" }
  end
end
