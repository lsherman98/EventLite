class CreateRegistrations < ActiveRecord::Migration[7.0]
  def change
    create_table :registrations do |t|
      t.references :event, null: false, foreign_key: {to_table: :events}
      t.references :user, null: false, foreign_key: {to_table: :users}
      t.integer :quantity, default: 1
      t.timestamps
    end
  end
end
