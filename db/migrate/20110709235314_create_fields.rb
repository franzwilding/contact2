class CreateFields < ActiveRecord::Migration
  def self.up
    create_table :fields do |t|
      t.string :name
      t.string :label
      t.string :itype
      t.integer :orderby
      t.boolean :required
      t.integer :fieldgroup_id

      t.timestamps
    end
  end

  def self.down
    drop_table :fields
  end
end
