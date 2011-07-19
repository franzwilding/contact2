class Field < ActiveRecord::Base
	
	belongs_to :fieldgroup
	has_many :fieldvalues
	
end
