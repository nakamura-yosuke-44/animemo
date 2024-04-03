# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

require "csv"

CSV.foreach(Rails.root.join('db', 'CSV', 'shops.csv'), encoding: "bom|utf-8", headers: :first_row) do |data|
  Shop.create(
    name: data['name'], 
    kana: data['kana'], 
    food: data['food'], 
    map: data['map'], 
    map_iflame: data['map_iflame'], 
    prefecture: data['prefecture'], 
    municipalities: data['municipalities'], 
    stree_address: data['stree_address'],
    station: data['station'], 
    transportation: data['transportation'], 
    phone_number: data['phone_number'],
    hp: data['hp'], 
    tabelog: data['tabelog'], 
    latitude: data['latitude'], 
    longitude: data['longitude']
  )
end

CSV.foreach(Rails.root.join('db', 'CSV', 'stories.csv'), encoding: "bom|utf-8", headers: :first_row) do |data|
  Story.create(
    season: data['season'], 
    ep: data['ep'], 
    title: data['title'],
  )
end

CSV.foreach(Rails.root.join('db', 'CSV', 'story_shops.csv'), encoding: "bom|utf-8", headers: :first_row) do |data|
  StoryShop.create(
    story_id: data['story_id'], 
    shop_id: data['shop_id']
  )
end