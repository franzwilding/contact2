class CreateFieldvalues < ActiveRecord::Migration
  def self.up
    create_table :fieldvalues do |t|
      t.integer :person_id
      t.integer :field_id
      t.text :value

      t.timestamps
    end
  end

  def self.down
    drop_table :fieldvalues
  end
end
