# frozen_string_literal: true

# factory_bot 導入に伴い、動作確認の為に作成しているfactory
# 使用する際は、factory内を修正した後、このコメントアウトを削除すること
FactoryBot.define do
  factory :user do
    username { "hoge" }
  end
end
