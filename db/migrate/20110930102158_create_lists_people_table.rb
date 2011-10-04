class CreateListsPeopleTable < ActiveRecord::Migration
  def self.up
    create_table :lists_people, :id => false do |t|
      t.integer :person_id
      t.integer :list_id
      t.timestamps
    end
  end

  def self.down
    drop_table :lists_people
  end
end
