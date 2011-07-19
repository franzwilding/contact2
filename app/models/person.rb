class Person < ActiveRecord::Base
	
	has_many :fieldvalues
	has_many :fields
	has_and_belongs_to_many :interactions

	
	#search
	scoped_search	:on => [:firstname, :surname, :email, :facebook, :twitter]
	
end