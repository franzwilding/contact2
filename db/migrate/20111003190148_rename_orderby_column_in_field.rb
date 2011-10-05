class RenameOrderbyColumnInField < ActiveRecord::Migration
  def self.up
    add_column :fields, :position, :integer
    #remove_column :lists, :orderby
  end

  def self.down
    remove_column :fields, :position
    #add_column :lists, :orderby, :integer
  end
end
