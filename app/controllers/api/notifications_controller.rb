class Api::NotificationsController < ApplicationController
  def unchecked_notifications
    notifications = current_user.passive_notifications.where(checked: false)
    render json: notifications, status: :ok
  end
end
