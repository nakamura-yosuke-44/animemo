class Post < ApplicationRecord
  belongs_to :user
  belongs_to :shop

  has_many :likes, dependent: :destroy
  has_many :liking_users, through: :likes, source: :user

  has_many :comments, dependent: :destroy

  has_many :notifications, dependent: :destroy

  validates :title, presence: true, length: { maximum: 100 }
  validates :body, presence: true, length: { maximum: 1000 }

  mount_uploader :image, ImageUploader

  def create_notification_like!(current_user)
    temp = Notification.where(["visitor_id = ? and visited_id = ? and post_id = ? and action = ? ", current_user.id, user_id, id, 'like'])
    if temp.blank?
      notification = current_user.active_notifications.new(
        post_id: id,
        visited_id: user_id,
        action: 'like'
      )
      notification.checked = true if notification.visitor_id == notification.visited_id
      notification.save if notification.valid?
    end
  end

  def create_notification_comment!(current_user, comment_id)
    save_notification_comment!(current_user, comment_id, user_id)
  end

  def save_notification_comment!(current_user, comment_id, visited_id)
    notification = current_user.active_notifications.new(
      post_id: id,
      comment_id:,
      visited_id:,
      action: 'comment'
    )
    notification.checked = true if notification.visitor_id == notification.visited_id
    notification.save if notification.valid?
  end
end
