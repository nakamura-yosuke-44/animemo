class CreatePosts < ActiveRecord::Migration[7.1]
  def change
    create_table :posts do |t|
      t.references :user, null: false, foreign_key: true
      t.references :shop, null: false, foreign_key: true
      t.string :image
      t.text :title, null: false
      t.text :body, null:false

      t.timestamps
    end  
  end
end
