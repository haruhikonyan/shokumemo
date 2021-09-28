class AddColumnsToMeals < ActiveRecord::Migration[6.1]
  def change
    add_reference :meals, :thumbnail_dish, foreign_key: { to_table: :dishes }, null: true
  end
end
