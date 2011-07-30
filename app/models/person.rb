class Person < ActiveRecord::Base
	
	has_many :fieldvalues
	has_many :fields
	has_and_belongs_to_many :interactions
	has_one :address
	
	accepts_nested_attributes_for :address
	
	#search
	scoped_search	:on => [:firstname, :surname, :email, :facebook, :twitter, :address]
	
end