FactoryBot.define do
  factory :post do
    sequence(:title) { |n| "titler-#{n}" }
    sequence(:body) { |Faker::Lorem.characters(number: 300) }
    image { Rack::Test::UploadedFile.new(Rails.root.join('spec', 'fixtures', 'images', 'example.jpg'), 'image/jpeg') }
    user
    shop_id {1}
  end
end





  end