json.array!(@clients) do |client|
  json.extract! client, :name, :teams, :players
  json.url client_url(client, format: :json)
end
