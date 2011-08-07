class City < ActiveRecord::Base
  
  has_one :address
  
	scoped_search	:on => [:name]

end
