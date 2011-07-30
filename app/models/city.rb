class City < ActiveRecord::Base

	scoped_search	:on => [:name]

end
