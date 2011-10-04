class List < ActiveRecord::Base
  
  has_and_belongs_to_many :people
    
  #search
	scoped_search	:on => [:title]
  
end
