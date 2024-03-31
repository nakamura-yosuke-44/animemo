class AddAgreementTermsToUsers < ActiveRecord::Migration[7.1]
  def change
    add_column :users, :agreement_terms, :boolean, default: false, null: false
  end
end
