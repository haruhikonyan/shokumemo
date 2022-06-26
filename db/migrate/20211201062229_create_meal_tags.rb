class CreateMealTags < ActiveRecord::Migration[6.1]
  def change
    create_table :meal_tags do |t|
      t.references :meal
      t.references :tag

      t.timestamps
    end
  end
end
