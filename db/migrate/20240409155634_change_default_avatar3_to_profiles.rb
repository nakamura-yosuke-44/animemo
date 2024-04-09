class ChangeDefaultAvatar3ToProfiles < ActiveRecord::Migration[7.1]
  def change
    change_column_default :profiles, :avatar, nil
  end
end
