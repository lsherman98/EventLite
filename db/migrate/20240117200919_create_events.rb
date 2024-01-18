class CreateEvents < ActiveRecord::Migration[7.0]
  def change
    create_table :events do |t|
      t.references :user, null: false, foreign_key: {to_table: :users}, index: true
      t.string :title, null: false, index: true
      t.text :description, null: false
      t.string :category, null: false, index: true
      t.float :price, default: 0
      t.string :city, null: false
      t.date :date, null: false, index: true
      t.string :address, null: false
      t.string :start_time, null: false
      t.boolean :age_limit, default: false
      t.timestamps
    end
  end
end
