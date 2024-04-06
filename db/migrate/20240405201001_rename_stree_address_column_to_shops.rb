class RenameStreeAddressColumnToShops < ActiveRecord::Migration[7.1]
  def change
    rename_column :shops, :stree_address, :street_address
    rename_column :shops, :tabelog, :tabelog_url
  end
end
