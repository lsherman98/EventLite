# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

ApplicationRecord.transaction do
  puts "Destroying tables..."
  # Unnecessary if using `rails db:seed:replant`
  Registration.destroy_all
  Bookmark.destroy_all
  Event.destroy_all
  User.destroy_all

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
  )

  # More users
  50.times do
    User.create!({
      username: Faker::Internet.unique.username(specifier: 3),
      email: Faker::Internet.unique.email,
      password: 'password',
      first_name: Faker::Name.first_name,
      last_name: Faker::Name.last_name,
      bio: Faker::Lorem.paragraph(sentence_count: 4)
    })
  end

  categories = ['Hobbies', 'Night Life', 'Music', 'Food', 'Performing Arts']
  cities = ['Miami', 'New York', 'Seattle', 'Los Angeles', 'Philadelphia']
  bool = [true, false]
  user_ids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  event_ids = (1..100).to_a

  puts "Creating events..."

  500.times do
    Event.create!({
      user_id: user_ids.sample,
      title: Faker::Show.play,
      description: Faker::Lorem.paragraph(sentence_count: 4),
      category: categories.sample,
      price: Faker::Commerce.price(range: 0..50),
      city: cities.sample,
      date: Faker::Date.between(from: 1.months.ago, to: 6.months.from_now),
      address: Faker::Address.street_address,
      start_time: "9:00 PM",
      age_limit: bool.sample,
      venue: Faker::Restaurant.name
    })
  end

  puts "Creating likes..."
  50.times do |i|
    10.times do |j|
      Bookmark.create!(user_id: i + 1, event_id: event_ids[j+1])
    end
  end

  puts "Registering users..."
  50.times do |i|
    20.times do |j|
      Registration.create!(event_id: j + 1, user_id: i + 1)
    end
  end



  puts "Done!"
end
