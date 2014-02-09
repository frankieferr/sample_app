json.extract! @notice, :id, :header, :body, :created_at, :updated_at

json.success @notice.errors.count == 0
