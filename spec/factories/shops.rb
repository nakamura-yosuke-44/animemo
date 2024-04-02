FactoryBot.define do
  factory :shop do
    name { "MyString" }
    kana { "MyString" }
    map { "MyText" }
    map_iflame { "MyText" }
    prefecture { "MyString" }
    municipalities { "MyString" }
    stree_address { "MyString" }
    station { "MyString" }
    transportation { "MyString" }
    phone_number { "MyString" }
    hp { "MyText" }
    tabelog { "MyText" }
    latitude { 1.5 }
    logitude { 1.5 }
  end
end
