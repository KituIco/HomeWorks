export default ( route ) => {
  const services = route.params.service;
  return { services }
}