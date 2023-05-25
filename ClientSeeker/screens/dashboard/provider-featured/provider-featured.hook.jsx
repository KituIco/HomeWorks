export default ({ route }) => {
  const { latitude, longitude } = route.params

  return { 
    latitude, longitude
  }
}