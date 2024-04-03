class CreateStories < ActiveRecord::Migration[7.1]
  def change
    create_table :stories do |t|
      t.string :season, null: false
      t.string :ep, null: false
      t.string :title, null: false

      t.timestamps
    end
  end
end
