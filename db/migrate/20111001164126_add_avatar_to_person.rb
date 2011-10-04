class AddAvatarToPerson < ActiveRecord::Migration
  def self.up
    add_column :people, :avatar, :string
  end

  def self.down
    add_column :people, :avatar, :string
  end
end
