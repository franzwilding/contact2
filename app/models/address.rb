class Address < ActiveRecord::Base
  
  belongs_to :people
  belongs_to :city
  belongs_to :province
    
end
