class AddPeopleToInteractions < ActiveRecord::Migration
  def self.up
  	
  	create_table :interactions_people, :id => false do |t| 
  		t.references :interaction 
  		t.references :person
		end
  	
  end

  def self.down
  	drop_table :articles_categories
  end
end
