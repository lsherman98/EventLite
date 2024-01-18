class CreateBookmarks < ActiveRecord::Migration[7.0]
  def change
    create_table :bookmarks do |t|
      t.references :user, null: true, foreign_key: {to_table: :users}
      t.references :event, null: true, foreign_key: {to_table: :events}
      t.timestamps
    end
  end
end
