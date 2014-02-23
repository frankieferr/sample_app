json.array!(@clients) do |client|
  json.extract! client, :id, :name, :email, :site_url
end
