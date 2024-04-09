class ChangeDefaultAvatarToProfiles < ActiveRecord::Migration[7.1]
  def change
    change_column_default :profiles, :avatar, "/images/no_image.jpg"
  end
end
