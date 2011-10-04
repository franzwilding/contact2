class CreateFotos < ActiveRecord::Migration
  def self.up

    create_table :fotos do |t|
      t.string :name
      t.text :description
      t.string :image_file_name
      t.references :fotoeable, :polymorphic => true
      t.string :avatar_file_name
      t.string :avatar_content_type
      t.integer :avatar_file_size
      t.datetime :avatar_updated_at

      t.timestamps
    end
  end

  def self.down
    drop_table :fotos
  end
end
