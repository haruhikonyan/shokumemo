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
require 'rails_helper'

RSpec.describe User, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
