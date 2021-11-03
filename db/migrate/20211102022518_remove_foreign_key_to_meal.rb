class RemoveForeignKeyToMeal < ActiveRecord::Migration[6.1]
  def change
    remove_foreign_key :meals, :dishes, column: :thumbnail_dish_id
    remove_index :meals, :thumbnail_dish_id
  end
end
