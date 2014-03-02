json.extract! @notice, :id, :header, :body

json.success @notice.errors.count == 0

json.errors @notice.errors
