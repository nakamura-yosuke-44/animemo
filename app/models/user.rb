class User < ApplicationRecord
  validates :name, presence: true
  validates :agreement_terms, acceptance: { accept: true, on: :create }
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :timeoutable, :confirmable
end
