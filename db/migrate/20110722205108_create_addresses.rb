class CreateAddresses < ActiveRecord::Migration
  def self.up
    create_table :addresses do |t|
      t.string :street
      t.string :number
      t.string :PLZ
      t.integer :person_id

      t.timestamps
    end
  end

  def self.down
    drop_table :addresses
  end
end
