class Person < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :token_authenticatable, :encryptable, :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :recoverable, :rememberable, :trackable, :validatable

  # Setup accessible (or protected) attributes for your model
  attr_accessible :email, :avatar, :phone, :password, :password_confirmation, :remember_me, :firstname, :surname, :id, :address_attributes, :facebook, :twitter, :website
    
  #validation
  validates_presence_of :firstname, :surname
  
  
  
	has_many :fieldvalues
	has_many :fields
	has_and_belongs_to_many :interactions
	has_one :address
	  
	has_one :province, :through => :address
	has_one :city, :through => :address
	
	has_and_belongs_to_many :lists
	
	accepts_nested_attributes_for :address
	accepts_nested_attributes_for :province
	accepts_nested_attributes_for :city
	
	def password_required?
    false
  end
  
  def email_required?
    false
  end
	
	def provincename
	 self.address.province.name
	end
	
	def cityname
	 self.address.city.name
	end
	
	def search_for(query)
	 super.search_for(query)
	end
	
	#search
	scoped_search	:on => [:firstname, :surname, :email, :facebook, :twitter, :phone]
	
	#province
  scoped_search :in => :province, :on => :name, :alias => :province
  #city
  scoped_search :in => :city, :on => :name, :alias => :city
  #fields
  scoped_search :in => :fieldvalues, :on => :field_id, :alias => :field
  #fieldvalues
  scoped_search :in => :fieldvalues, :on => :value, :alias => :value

end