tickets_sold = 0
@event.registrations.each do |registration|
  tickets_sold += registration.quantity
end
json.event do
  json.extract! @event, :id, :user_id, :title, :description, :category, :price, :city, :date, :address, :start_time, :age_limit, :venue
  json.organizer "#{@event.organizer.first_name} #{@event.organizer.last_name}"
  json.total_likes @event.bookmarking_users.length
  json.total_attendees @event.registered_users.length
  json.tickets_sold tickets_sold
  json.attendees @event.registered_users.map {|user| {fullName: "#{user.first_name} #{user.last_name}", email: "#{user.email}", numTickets: "#{Registration.find_by(user_id: user.id, event_id: @event.id)&.quantity}"}}
end
