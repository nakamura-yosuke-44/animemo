class CreateShops < ActiveRecord::Migration[7.1]
  def change
    create_table :shops do |t|
      t.string :name, null: false
      t.string :kana, null: false
      t.text :food
      t.text :map
      t.text :map_iflame
      t.string :prefecture
      t.string :municipalities
      t.string :stree_address
      t.string :station
      t.text :transportation
      t.string :phone_number
      t.text :hp
      t.text :tabelog
      t.float :latitude
      t.float :longitude

      t.timestamps
    end

    add_index :shops, :name
    add_index :shops, :kana
    add_index :shops, :prefecture
    add_index :shops, :municipalities
    add_index :shops, :station
    add_index :shops, :latitude
    add_index :shops, :longitude
  end
end
