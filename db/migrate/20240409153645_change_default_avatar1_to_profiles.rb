class ChangeDefaultAvatar1ToProfiles < ActiveRecord::Migration[7.1]
  def change
    change_column_default :profiles, :avatar, from: nil, to: "no_image.jpg"
  end
end
