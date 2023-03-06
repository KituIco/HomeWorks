export const getImageURL = (raw) => {
  let splits = raw.split('/');
  let id = splits[splits.length-2];
  let url = `https://drive.google.com/uc?export=view&id=${id}`;
  return url;
}