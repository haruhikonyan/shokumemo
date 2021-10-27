# frozen_string_literal: true

module MealsHelper
  def meal_meta_tags(meal)
    title = "タベルバム | #{meal.title.presence || "#{meal.eaten_at.strftime('%Y年%m月%d日')} 投稿"}"
    description = "#{meal.eaten_at.strftime('%Y年%m月%d日')} 投稿。#{meal.location.present? ? "#{meal.location}にて、" : ''} #{meal.description.presence || meal.thumbnail_dish.description.presence || meal.thumbnail_dish.title}"
    {
      titie: title,
      description: description,
      keywords: "タベルバム, tabelbum, たべるばむ, taberubamu#{meal.title.present? ? ", #{meal.title}" : ''}",
      og: {
        title: title,
        description: description,
        type: 'article',
        image: url_for(meal.thumbnail_image),
      },
    }
  end
end
