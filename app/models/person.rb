class Person < ActiveRecord::Base
	
	has_many :fieldvalues
	has_many :fields
	has_and_belongs_to_many :interactions
	has_one :address
	  
	has_one :province, :through => :address
	has_one :city, :through => :address
	
	accepts_nested_attributes_for :address
	accepts_nested_attributes_for :province
	accepts_nested_attributes_for :city
	
	#search
	scoped_search	:on => [:firstname, :surname, :email, :facebook, :twitter, :address]
	
end