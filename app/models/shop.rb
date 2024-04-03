class Shop < ApplicationRecord
  has_many :story_shops, dependent: :destroy
  has_many :stories, through: :story_shops
end
