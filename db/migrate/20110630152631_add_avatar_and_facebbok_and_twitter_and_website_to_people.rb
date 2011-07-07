class AddAvatarAndFacebbokAndTwitterAndWebsiteToPeople < ActiveRecord::Migration
  def self.up
  	add_column :people, :avatar, :string
		add_column :people, :facebook, :string
		add_column :people, :twitter, :string
		add_column :people, :website, :string
  end

  def self.down
  end
end
