# frozen_string_literal: true

module UsersHelper
  def user_meta_tags(user)
    title = "タベルバム | #{user.display_name} さんの投稿一覧"
    {
      titie: title,
      description: user.description,
      keywords: "タベルバム, tabelbum, たべるばむ, taberubamu #{user.display_name}",
      og: {
        title: title,
        description: user.description,
        type: 'article',
        # プロフィール写真投稿できるように鳴ったら設定
        # image: ,
      },
    }
  end
end
