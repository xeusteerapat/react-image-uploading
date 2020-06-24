import React, { useState } from 'react';

function App() {
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);

  const uploadImage = async e => {
    console.log('File uploading');
    const { files } = e.target;

    console.log(e.target.files);

    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'sickfits');
    setLoading(true);

    console.log(data);

    for (let d of data.entries()) {
      console.log(d[0] + ', ' + d[1]);
    }
    const res = await fetch(
      'https://api.cloudinary.com/v1_1/xeusteerapat/image/upload',
      {
        method: 'POST',
        body: data,
      }
    );
    const fileImage = await res.json();
    setImage(fileImage.secure_url);
    setLoading(false);
  };

  return (
    <div className='App'>
      <h1>Upload your image</h1>
      <form action=''>
        <input type='file' name='file' onChange={uploadImage} />
        <button>Add</button>
      </form>
      <div className='preview'>
        {loading ? <p>Loading...</p> : <img src={image} alt='pic' />}
      </div>
    </div>
  );
}

export default App;
