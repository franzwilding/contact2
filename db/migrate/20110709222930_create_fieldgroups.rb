class CreateFieldgroups < ActiveRecord::Migration
  def self.up
    create_table :fieldgroups do |t|
      t.string :name
      t.integer :sortindex

      t.timestamps
    end
  end

  def self.down
    drop_table :fieldgroups
  end
end
