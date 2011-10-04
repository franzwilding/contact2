class AddPersonToLists < ActiveRecord::Migration
  def self.up
    add_column :people, :list_id, :integer
  end

  def self.down
    remove_column :people, :list_id
  end
end
