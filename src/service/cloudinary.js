import { Cloudinary } from '@cloudinary/url-gen';

const cld = new Cloudinary({
  cloud: {
    cloudName: process.env.REACT_APP_CLOUDINARY_CLOUDNAME,
  },
});

const presetName = process.env.REACT_APP_CLOUDINARY_PRESET;
const URL = process.env.REACT_APP_CLOUDINARY_URL;

export default function upload(file) {
  const formData = new FormData();

  formData.append('file', file);
  formData.append('upload_preset', presetName);

  return fetch(URL, {
    method: 'POST',
    body: formData,
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => data.url)
    .catch(console.error);
}
