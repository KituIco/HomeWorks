export const contactHandler = (text) => {
  if (text.length > 3) {
    let formattedText = text.split(' ').join('');
    return formattedText.replace(/^(.{3})(.{3})(.{3})(.{4})$/, "$1 $2 $3 $4");
  } 
  else if (text.length >= 2) {
    return '+63';
  }
}