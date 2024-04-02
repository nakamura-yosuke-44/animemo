class CreateStoryShops < ActiveRecord::Migration[7.1]
  def change
    create_table :story_shops do |t|
      t.references :story, null: false, foreign_key: true
      t.references :shop, null: false, foreign_key: true

      t.timestamps
    end
  end
end
