class CreateMeals < ActiveRecord::Migration[6.1]
  def change
    create_table :meals do |t|
      t.string :title
      t.text :description
      t.integer :scene, default: 0
      t.boolean :private, default: false, null: false

      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
