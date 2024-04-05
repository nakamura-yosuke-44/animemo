class Shop < ApplicationRecord
  has_many :story_shops, dependent: :destroy
  has_many :stories, through: :story_shops

  scope :by_name, ->(name) { where('name LIKE ?  OR kana LIKE ? ', "%#{name}%", "%#{name}%") }
  scope :by_prefecture, ->(prefecture) { where('prefecture LIKE ?', "#{prefecture}%") }
  scope :by_season, ->(season) { joins(:stories).where('stories.season': season) }
  scope :by_municipalities, ->(municipalities) { where('municipalities LIKE ?', "%#{municipalities}%") }
end
