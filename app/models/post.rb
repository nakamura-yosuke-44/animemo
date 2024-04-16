class Post < ApplicationRecord
  belongs_to :user
  belongs_to :shop

  has_many :likes, dependent: :destroy
  has_many :liking_users, through: :likes, source: :user

  has_many :comments, dependent: :destroy

  validates :title, presence: true, length: { maximum: 100 }
  validates :body, presence: true, length: { maximum: 1000 }

  mount_uploader :image, ImageUploader
end
