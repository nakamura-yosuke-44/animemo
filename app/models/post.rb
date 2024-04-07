class Post < ApplicationRecord
  belongs_to :user
  belongs_to :shop

  validates :title, presence: true, length: { maximum: 100 }
  validates :body, presence: true, length: { maximum: 1000 }

  mount_uploader :image, ImageUploader
end
