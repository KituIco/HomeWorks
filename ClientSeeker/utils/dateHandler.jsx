export const dateHandler = (date) => {
  let values = date.split("/");
  let year = parseInt(values[0]);
  let month = parseInt(values[1]);
  let day = parseInt(values[2]);

  const months = ["January","February","March","April","May","June","July",
  "August","September","October","November","December"];

  let formatted = `${months[month-1]} ${day}, ${year}` 
  return formatted
}