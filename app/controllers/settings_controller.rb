class SettingsController < ApplicationController

  def index
  end
  
  def profile
  end
  
  def peoplefields
  	@fieldgroups = Fieldgroup.all
  end
  
  def addpeoplegroup
  	
  	group = Fieldgroup.new
  	group.name = params[:name]
 		group.save
 		 	
  	redirect_to :action => "peoplefields"
  end

end
