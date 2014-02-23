json.extract! @client, :id, :name, :email, :site_url

json.success @client.errors.count == 0

json.errors @client.errors