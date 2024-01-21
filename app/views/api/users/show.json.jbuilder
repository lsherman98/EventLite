json.user do
  json.extract! @user, :id, :email, :username, :first_name, :last_name, :bio, :created_at
  json.full_name "#{@user.first_name} #{@user.last_name}"
  json.total_events @user.organized_events.length
  json.events @user.organized_events
  json.likes @user.bookmarked_events.map do |event|
    json.extract! event, :id, :user_id, :title, :description, :category, :price, :city, :date, :address, :start_time, :age_limit, :venue
    json.organizer "#{event.organizer.first_name} #{event.organizer.last_name}"
  end
  json.tickets @user.registered_events.map do |ticket|
    json.extract! ticket, :id, :user_id, :title, :description, :category, :price, :city, :date, :address, :start_time, :age_limit, :venue
    json.organizer "#{ticket.organizer.first_name} #{ticket.organizer.last_name}"
  end
end
