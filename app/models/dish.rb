# == Schema Information
#
# Table name: dishes
#
#  id          :bigint           not null, primary key
#  description :text(65535)
#  title       :string(255)
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  meal_id     :bigint           not null
#
# Indexes
#
#  index_dishes_on_meal_id  (meal_id)
#
# Foreign Keys
#
#  fk_rails_...  (meal_id => meals.id)
#
class Dish < ApplicationRecord
  belongs_to :meal
  after_commit :generate_thumbnail_image_and_attach, if: -> { !thumbnail_image.attached? && full_size_image.attached? }
  
  has_one_attached :full_size_image
  has_one_attached :thumbnail_image

  after_save do
    thumbnail_image.purge if full_size_image.saved_change_to_checksum? && thumbnail_image.attached? && !thumbnail_image.saved_change_to_checksum?
  end

  def generate_thumbnail_image_and_attach
    path = ImageProcessing::MiniMagick.source(ActiveStorage::Blob.service.send(:path_for, full_size_image.key)).resize_to_limit(1200, 900).call.path
    thumbnail_image.attach(io: File.open(path), filename: full_size_image.name)
  end
end
