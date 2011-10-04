class AddQueryToLists < ActiveRecord::Migration
  def self.up
    add_column :lists, :query, :text
  end

  def self.down
    remove_column :lists, :query
  end
end
