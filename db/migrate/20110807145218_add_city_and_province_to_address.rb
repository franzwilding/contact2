class AddCityAndProvinceToAddress < ActiveRecord::Migration
  def self.up
    
    add_column :addresses, :city_id, :integer
    add_column :addresses, :province_id, :integer
    
  end

  def self.down
    
    remove_column :addresses, :city_id
    remove_column :addresses, :province_id
    
  end
end
