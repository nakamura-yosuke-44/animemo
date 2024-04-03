class Story < ApplicationRecord
  has_many :story_shops, dependent: :destroy
  has_many :shops, through: :story_shops
end
