class Comment < ApplicationRecord
  belongs_to :user
  belongs_to :post

  belongs_to :parent, class_name: "Comment", optional: true
  has_many :replies, class_name: "Comment", foreign_key: :parent_id, dependent: :destroy

  has_many :notifications, dependent: :destroy

  validates :body, presence: true, length: { maximum: 500 }

  def create_notification_reply!(current_user, reply_id)
    save_notification_reply!(current_user, reply_id, user_id)
  end

  def save_notification_reply!(current_user, reply_id, visited_id)
    notification = current_user.active_notifications.new(
      comment_id: id,
      reply_id: reply_id,
      visited_id: visited_id,
      action: 'reply'
    )
    if notification.visitor_id == notification.visited_id
      notification.checked = true
    end
    notification.save if notification.valid?
  end
end
