class Province < ActiveRecord::Base
	
	scoped_search	:on => [:name]
	
end
