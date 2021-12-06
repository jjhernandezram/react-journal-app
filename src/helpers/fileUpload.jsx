export const fileUpload = async (file) => {
  const cloudinaryUrl = `https://api.cloudinary.com/v1_1/dn6unzxco/image/upload`;
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'journal_app');

  try {
    const resp = await fetch(cloudinaryUrl, {
      method: 'POST',
      body: formData
    });
    if (resp.ok) {
      const fileUrl = await resp.json();
      return fileUrl.secure_url;
    }

  } catch (err) {
    console.log(err);

  }
};