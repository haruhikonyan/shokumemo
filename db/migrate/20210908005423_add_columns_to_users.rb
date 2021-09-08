class AddColumnsToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :provider, :string
    add_column :users, :uid, :string
    add_column :users, :username, :string, null: true
    add_column :users, :email, :string, null: true
    add_column :users, :display_name, :string, null: false, default: ""
    add_column :users, :description, :text, null: true

    add_index :users, :uid, unique: true
  end
end
