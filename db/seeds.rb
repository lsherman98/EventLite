# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
require "open-uri"

json_data = JSON.parse(File.read("db/master_events.json"))
seed_events = json_data['events']
seed_users = json_data['users']


# ApplicationRecord.transaction do
  def generate_time_within_range
    start_time = Time.parse('5:00 PM')
    end_time = Time.parse('11:00 PM')

    random_time = Faker::Time.between_dates(from: start_time, to: end_time, period: :day)
    formatted_time = random_time.strftime('%H:%M')

    formatted_time
  end


  puts "Destroying tables..."
  # Unnecessary if using `rails db:seed:replant`
  # Registration.destroy_all
  # Bookmark.destroy_all
  puts "Destoying Events..."
  Event.destroy_all
  puts "Destoying Users..."
  User.destroy_all
  Registration.destroy_all
  Bookmark.destroy_all

  puts "Resetting primary keys..."
  # For easy testing, so that after seeding, the first `User` has `id` of 1
  ApplicationRecord.connection.reset_pk_sequence!('users')
  ApplicationRecord.connection.reset_pk_sequence!('events')
  ApplicationRecord.connection.reset_pk_sequence!('bookmarks')
  ApplicationRecord.connection.reset_pk_sequence!('registrations')

  puts "Creating users..."


  # Create one user with an easy to remember username, email, and password:
  User.create!(
    username: 'demouser',
    email: 'demo@user.io',
    password: 'password',
    first_name: "demo",
    last_name: "user",
    bio: "I am the first user!"
  ).photo.attach(io: URI.open("https://eventlite-seeds.s3.amazonaws.com/user-images/user-seed.jpeg"), filename: "user-seed.jpeg")

  total_users = 1
  # More users
  seed_users.each do |seed_user|
    imgId = seed_user['userId']
    path = "https://eventlite-seeds.s3.amazonaws.com/user-images/#{imgId}.jpg"
    # puts path
    begin
      User.create!({
        username: Faker::Internet.unique.username(specifier: 3),
        email: Faker::Internet.unique.email,
        password: 'password',
        first_name: Faker::Name.first_name,
        last_name: Faker::Name.last_name,
        bio: seed_user['bio']
      })
      .photo.attach(io: URI.open(path), filename: "#{imgId}.jpg")
      total_users += 1
      puts "User created"
    rescue OpenURI::HTTPError => e

      puts "Failed to fetch image for user #{imgId}: #{e.message}"
      next
    end
  end



  categories = ['Hobbies', 'Night Life', 'Music', 'Food', 'Performing Arts']
  cities = ['Miami', 'New York', 'Seattle', 'Los Angeles', 'Philadelphia']
  bool = [true, false]
  user_ids = (1..9).to_a
  event_ids = (1..229).to_a

  puts "Creating events..."
  total_events = 0
 seed_events.each do |seed_event|
  imgId = seed_event['eventId']
  path = "https://eventlite-seeds.s3.amazonaws.com/event-images/#{imgId}.jpg"

  begin
    Event.create!({
      user_id: user_ids.sample,
      title: seed_event['eventTitle'],
      description: seed_event['eventDescription'],
      category: categories.sample,
      price: Faker::Commerce.price(range: 0..15),
      city: cities.sample,
      date: Faker::Date.between(from: 1.weeks.ago, to: 1.weeks.from_now),
      address: Faker::Address.street_address,
      start_time: generate_time_within_range,
      age_limit: bool.sample,
      venue: seed_event['venue']
    }).photo.attach(io: URI.open(path), filename: "#{imgId}.jpg")

    total_events += 1
    puts "Event created"
  rescue OpenURI::HTTPError => e
      puts "Failed to fetch image for event #{imgId}: #{e.message}"
      next
  end
  end


  puts "Creating likes..."
  User.all.each do |user|
    10.times do |j|
      Bookmark.create!(user_id: user.id, event_id: j+1)
    end
  end

  puts "Registering users..."
  Event.all.each do |event|
    10.times do |j|
      Registration.create!(event_id: event.id, user_id: j+1, quantity: [1, 2, 3, 4].sample)
    end
  end



  puts "Done!"
  puts "# of Users created: #{total_users}"
  puts "# of Events created: #{total_events}"

# end
