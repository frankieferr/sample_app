# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

puts "\n----------RUNNING SEEDS----------\n"

# Client

client1 = Client.create!(name: "Soccer Rules", email: "soccer@ball.com", site_url: "localhost:3000")
client2 = Client.create!(name: "Soccer World", email: "soccer@world.com", site_url: "soccer.com")

# Users

def create_user(hash)
	newuser = User.new({
      email: hash[:email],
      password: hash[:password],
      password_confirmation: hash[:password_confirmation]
   })
   newuser.roles = hash[:role] if hash[:role]
   newuser.client = hash[:client] if hash[:client]
   newuser.save!
end

create_user({email: "super@admin.com", password: "test", password_confirmation: "test", role: "super_admin"})


# Teams

team1 = Team.create!(client_id: client1.id, name: "Frankie's Team")
team2 = Team.create!(client_id: client1.id, name: "The Swag Team")
team3 = Team.create!(client_id: client1.id, name: "Bullets", accepted: false)

team4 = Team.create!(client_id: client2.id, name: "AC Milan")
team5 = Team.create!(client_id: client2.id, name: "Barcelona")


# Players

Player.create!(client_id: client1.id, name: "Frankie", age: 20, number: 24, team_id: team1.id)
Player.create!(client_id: client1.id, name: "Steph", age: 17, number: 20, team_id: team1.id)
Player.create!(client_id: client1.id, name: "Marco", age: 18, number: 8, team_id: team1.id)
Player.create!(client_id: client1.id, name: "Gabri", age: 18, number: 1, team_id: team1.id)

Player.create!(client_id: client1.id, name: "Steph Swag", age: 17, number: 20, team_id: team2.id)

Player.create!(client_id: client2.id, name: "Kaka", age: 28, number: 22, team_id: team4.id)

Player.create!(client_id: client2.id, name: "Messi", age: 25, number: 35, team_id: team5.id)
Player.create!(client_id: client2.id, name: "Neymar", age: 20, number: 28, team_id: team5.id)


# Notices
Notice.create!(order_num: 0, client_id: client1.id, header: "Under 15 Comp Starting Up", body: "Teams are now starting to register for this new competition, hurry and get your players together, come down and register")
Notice.create!(order_num: 1, client_id: client1.id, header: "The Rangers win the Under 8 Competition", body: "The Rangers won")
Notice.create!(order_num: 2, client_id: client1.id, header: "We are fun, Join Us", body: "You should really join us")
Notice.create!(order_num: 3, client_id: client1.id, header: "I am out of ideas already", body: "Seriously...")
Notice.create!(order_num: 0, client_id: client2.id, header: "Basketball notice", body: "You shouldn't see this unless you changed the site url")

Game.create!(client_id: client1.id, home_team_id: 1, away_team_id: 2, home_team_score: 3, away_team_score: 1, date: Date.today, time: Time.now)

puts "\n----------FINISHED SEEDS---------\n"