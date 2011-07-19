class Fieldvalue < ActiveRecord::Base
	
	has_one :field
	has_one :people

end