# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ :name => 'Chicago' }, { :name => 'Copenhagen' }])
#   Mayor.create(:name => 'Daley', :city => cities.first)

Person.create(
  :firstname              => 'Franz', 
  :surname                => 'Wilding', 
  :email                  => 'mail@franz-wilding.at', 
  :password               => 'password', 
  :password_confirmation  => 'password'
  )