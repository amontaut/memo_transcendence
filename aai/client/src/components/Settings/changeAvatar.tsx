// import { useEffect, useState, useRef, ChangeEvent } from "react"
// import axios from 'axios';

// function ChangeAvatar() {
// 	const [file, setFile] = useState<File>();

// 	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
// 	  if (e.target.files) {
// 		setFile(e.target.files[0]);
// 	  }
// 	};

// 	const handleUploadClick = () => {
// 	  if (!file) {
// 		return;
// 	  }

// 	  // 👇 Uploading the file using the fetch API to the server
// 	  axios.patch(`/users/1`, {
// 		method: 'PATCH',
// 		body: file,
// 		// 👇 Set headers manually for single file upload
// 		headers: {
// 		  'content-type': file.type,
// 		  'content-length': `${file.size}`, // 👈 Headers need to be a string
// 		},
// 	  })
// 	  .then((response) => {
// 		// console.log(response.data);
// 		alert("Username changed")
// 		})
// 		.then((data) => console.log(data))
// 		.catch((err) => console.error(err));
// 	};

// 	return (
// 	  <div>
// 		<input type="file" onChange={handleFileChange} />

// 		<div>{file && `${file.name} - ${file.type}`}</div>

// 		<button onClick={handleUploadClick}>Upload</button>
// 	  </div>
// 	);
//   }

//   export default ChangeAvatar;

import { useEffect, useState, useRef, ChangeEvent } from 'react'
import axios from 'axios'

function ChangeAvatar() {
    const [selectedFile, setSelectedFile] = useState()
	const [state, setstate] = useState<any>({
        avatar: null,
    })

    function onInputClick(e: any) {
        let avatar = e.target.files[0].name
        setstate({
            avatar: avatar,
        })
		// console.log(e.target.files)
		console.log(e.target.files[0].name)
		// console.log(e.target.name)
		// console.log(e.target.files.name)
		
		
		
        // setSelectedFile({ e });
    }

    function handleUpload(e: any) {
        e.preventDefault()
        console.log(state)
        let avatar = state
        let formdata = new FormData()
        formdata.append('image', avatar)
		formdata.append('name', 'users avatar')
		console.log(state)
        axios
            .patch(`/users/` + `1`, {
				avatar: "https://DSC_0002.jpeg",
				"Content-Type": "multipart/form-data",
            })
            .then((response) => {
                console.log(response)
            })

        // axios
        //     .patch(`/users/` + `1`, { avatar: formdata })
        //     .then((response) => {
        //         // getAllUser(response.data);
        //         // setLoading(false);
        //         alert('Username changed')
        //     })
        //     .catch((err) => {
        //         console.log(err.message)
        //         // setError(err.message)
        //     })

        // axios({
        //     url: `users/1`,
        //     method: 'PATCH',
        //     data: formdata,
        // }).then(
        //     (res) => {},
        //     (err) => {}
        // )
    }

    return (
        <form>
            <label>Select file: </label>
            {/* <input type="file" name="file" onChange={(e) => onFileChanged(e)} onClick={(e) => onInputClick(e)} /> */}
            <input type="file" name="avatar" onInput={(e) => onInputClick(e)} />
            <button type="button" onClick={(e) => handleUpload(e)}>
                Upload
            </button>
        </form>
    )
}
export default ChangeAvatar
