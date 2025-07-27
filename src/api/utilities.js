import axios from "axios"

//uploade image & return image url
export const imageUpload = async imageData =>{
    const imageFormData = new FormData()
    imageFormData.append('image', imageData) 
    const {data} = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_API_IMAGE_URL}`,
      imageFormData
    )
    return data.data?.display_url
}

//save or update user in db
export const saveUserDB = async user =>{
  const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/user`, user)
  console.log(data);
}