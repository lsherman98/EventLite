class AddIndexToRegisrationsAndBookmarks < ActiveRecord::Migration[7.0]
  def change
    add_index :bookmarks, [:user_id, :event_id], unique: true
    add_index :registrations, [:event_id, :user_id], unique: true
  end
end
