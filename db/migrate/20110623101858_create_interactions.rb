class CreateInteractions < ActiveRecord::Migration
  def self.up
    create_table :interactions do |t|
      t.string :title
      t.text :description
      t.datetime :happend_at

      t.timestamps
    end
  end

  def self.down
    drop_table :interactions
  end
end
