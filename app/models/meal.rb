# == Schema Information
#
# Table name: meals
#
#  id                :bigint           not null, primary key
#  description       :text(65535)
#  private           :boolean          default(FALSE), not null
#  scene             :integer          default("unknown")
#  title             :string(255)
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  thumbnail_dish_id :bigint
#  user_id           :bigint           not null
#
# Indexes
#
#  index_meals_on_thumbnail_dish_id  (thumbnail_dish_id)
#  index_meals_on_user_id            (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (thumbnail_dish_id => dishes.id)
#  fk_rails_...  (user_id => users.id)
#
class Meal < ApplicationRecord
  belongs_to :user
  belongs_to :thumbnail_dish, class_name: 'Dish', optional: true
  has_many :dishes, dependent: :destroy
  accepts_nested_attributes_for :dishes, allow_destroy: true

  scope :release, -> { where(private: false) }

  enum scene: { unknown: 0, breakfast: 1, brunch: 2, runch: 3, dinner: 4, snack: 5, drink: 6, late_night_snack: 7, other: 99 }

  # TODO: ちょっと微妙 ヘルパーのがいいかな？
  def thumbnail_image
    # active storage で where ってどう使うの？
    thumbnail_dish.present? ? thumbnail_dish.thumbnail_image : dishes.find{|d| d.thumbnail_image.attached? }.thumbnail_image
  end

  # TODO: ゆくゆくは i18n
  def scene_label
    return 'なし' if unknown?
    return '朝ごはん' if breakfast?
    return 'ブランチ' if brunch?
    return '昼ごはん' if runch?
    return '夜ごはん' if dinner?
    return 'おやつ' if snack?
    return '飲み' if drink?
    return '夜食' if late_night_snack?
    return 'その他' if other?
  end

  def self.scene_label(num)
    return 'なし' if num.zero?
    return '朝ごはん' if num == 1
    return 'ブランチ' if num == 2
    return '昼ごはん' if num == 3
    return '夜ごはん' if num == 4
    return 'おやつ' if num == 5
    return '飲み' if num == 6
    return '夜食' if num == 7
    return 'その他' if num == 99
  end

  # TODO: Meal.scenes とか i18n 使っていい感じにする
  def self.scene_label_and_values
    [
      ['なし', 'unknown'],
      ['朝ごはん', 'breakfast'],
      ['ブランチ', 'brunch'],
      ['昼ごはん', 'runch'],
      ['夜ごはん', 'dinner'],
      ['おやつ', 'snack'],
      ['飲み', 'drink'],
      ['夜食', 'late_night_snack'],
      ['その他', 'other']
    ]
  end
end
