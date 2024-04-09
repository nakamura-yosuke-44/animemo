FactoryBot.define do
  factory :profile do
    bio { "MyText" }
    avatar { "MyString" }
    user { nil }
  end
end
