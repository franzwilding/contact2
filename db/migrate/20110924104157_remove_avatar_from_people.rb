class RemoveAvatarFromPeople < ActiveRecord::Migration
  def self.up
    remove_column :people, :avatar
  end

  def self.down
    add_column :people, :avatar, :string
  end
end
