class Field < ActiveRecord::Base
	
	belongs_to :fieldgroup
	has_many :fieldvalues
  	
  acts_as_list
  default_scope :order => 'position ASC'
  	
end
