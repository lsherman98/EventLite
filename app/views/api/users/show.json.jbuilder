json.user do
  json.extract! @user, :id, :email, :username, :first_name, :last_name, :bio, :created_at
  json.full_name "#{@user.first_name} #{@user.last_name}"
  json.total_events @user.organized_events.length
  json.events @user.organized_events
  json.likes @user.bookmarked_events
  json.tickets @user.registered_events
end
