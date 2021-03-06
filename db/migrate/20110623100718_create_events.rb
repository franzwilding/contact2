class CreateEvents < ActiveRecord::Migration
  def self.up
    create_table :events do |t|
      t.string :title
      t.datetime :started_at
      t.datetime :ended_at
      t.text :description

      t.timestamps
    end
  end

  def self.down
    drop_table :events
  end
end
