class CreateTags < ActiveRecord::Migration[6.1]
  def change
    create_table :tags do |t|
      t.string :name, null: false
      t.integer :count, null: false, default: 0
      t.boolean :display_top, null: false, default: false

      t.timestamps
    end
  end
end
