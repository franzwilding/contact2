# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20110807145218) do

  create_table "addresses", :force => true do |t|
    t.string   "street"
    t.string   "number"
    t.string   "PLZ"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "person_id"
    t.integer  "city_id"
    t.integer  "province_id"
  end

  create_table "cities", :force => true do |t|
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "events", :force => true do |t|
    t.string   "title"
    t.datetime "started_at"
    t.datetime "ended_at"
    t.text     "description"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "fieldgroups", :force => true do |t|
    t.string   "name"
    t.integer  "sortindex"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "fields", :force => true do |t|
    t.string   "name"
    t.string   "label"
    t.string   "itype"
    t.integer  "orderby"
    t.boolean  "required"
    t.integer  "fieldgroup_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "fieldvalues", :force => true do |t|
    t.integer  "person_id"
    t.integer  "field_id"
    t.text     "value"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "interactions", :force => true do |t|
    t.string   "title"
    t.text     "description"
    t.datetime "happend_at"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "interactions_people", :id => false, :force => true do |t|
    t.integer "interaction_id"
    t.integer "person_id"
  end

  create_table "lists", :force => true do |t|
    t.string   "title"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "people", :force => true do |t|
    t.string   "firstname"
    t.string   "surname"
    t.string   "email"
    t.string   "phone"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "avatar"
    t.string   "facebook"
    t.string   "twitter"
    t.string   "website"
  end

  create_table "provinces", :force => true do |t|
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
