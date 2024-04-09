class AddDefaultAvatarToProfiles < ActiveRecord::Migration[7.1]
  def change
    change_column_default :profiles, :avatar, "/assets/no_image.jpg"
  end
end
