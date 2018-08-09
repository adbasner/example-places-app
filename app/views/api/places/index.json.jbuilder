json.array! @places.each do |place|
  json.name place.name
  json.address place.address
end