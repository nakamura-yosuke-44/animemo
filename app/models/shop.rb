class Shop < ApplicationRecord

  has_many :story_shops
  has_many :stories, through: :story_shops

  has_many :visits
  has_many :users, through: :visits

  has_many :posts, dependent: :destroy

  scope :by_name, ->(name) { where('name LIKE ?  OR kana LIKE ? ', "%#{name}%", "%#{name}%") }
  scope :by_prefecture, ->(prefecture) { where('prefecture LIKE ?', "#{prefecture}%") }
  scope :by_season, ->(season) { joins(:stories).where('stories.season': season) }
  scope :by_municipalities, ->(municipalities) { where('municipalities LIKE ?', "%#{municipalities}%") }

  

  scope :by_municipalities, ->(municipalities) { where('municipalities LIKE ?', "%#{municipalities}%") }

  geocoded_by :full_address
  after_validation :geocode

  def full_address
    "#{prefecture} #{municipalities} #{street_address}"
  end
end
