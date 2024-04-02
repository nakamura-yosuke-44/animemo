# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2024_04_02_043624) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "shops", force: :cascade do |t|
    t.string "name", null: false
    t.string "kana", null: false
    t.text "food"
    t.text "map"
    t.text "map_iflame"
    t.string "prefecture"
    t.string "municipalities"
    t.string "stree_address"
    t.string "station"
    t.text "transportation"
    t.string "phone_number"
    t.text "hp"
    t.text "tabelog"
    t.float "latitude"
    t.float "longitude"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["kana"], name: "index_shops_on_kana"
    t.index ["latitude"], name: "index_shops_on_latitude"
    t.index ["longitude"], name: "index_shops_on_longitude"
    t.index ["municipalities"], name: "index_shops_on_municipalities"
    t.index ["name"], name: "index_shops_on_name"
    t.index ["prefecture"], name: "index_shops_on_prefecture"
    t.index ["station"], name: "index_shops_on_station"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "unconfirmed_email"
    t.string "name", null: false
    t.integer "role", default: 0, null: false
    t.string "avatar"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "agreement_terms", default: false, null: false
    t.string "provider"
    t.string "uid"
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

end
