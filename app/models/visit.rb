class Visit < ApplicationRecord
  belongs_to :user
  belongs_to :shop

  enum status: { pending: 0, went: 1, want_to: 2 }
end
