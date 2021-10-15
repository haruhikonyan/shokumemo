class AddColumnToMeals < ActiveRecord::Migration[6.1]
  def up
    add_column :meals, :eaten_at, :datetime, null: true
    add_column :meals, :location, :string, null: true
  end

  def down
    remove_column :meals, :eaten_at , :datetime, null: true
    remove_column :meals, :location, :string, null: true
  end
end
