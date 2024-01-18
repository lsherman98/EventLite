json.event do
  json.extract! @event, :id, :user_id, :title, :description, :category, :price, :city, :date, :address, :start_time, :age_limit, :venue
  json.organizer "#{@event.organizer.first_name} #{@event.organizer.last_name}"
  json.total_likes @event.bookmarking_users.length
  json.total_attendees @event.registered_users.length
  json.attendees @event.registered_users.map {|user| "#{user.first_name} #{user.last_name}"}
end
