class NotificationsController < ApplicationController
  def index
    @notifications = current_user.passive_notifications.includes(:visitor, :visited, :post, :comment)
    @notifications.update_all(checked: true)
  end
end
