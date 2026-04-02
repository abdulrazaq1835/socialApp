
import axios from "./axios.js"

export const registerUser = async (data) => {
  const res = await axios.post("/auth/register",data);

  return res.data;
};

export const loginUser =  async (data)=>{
    const res =  await axios.post("/auth/login",data)
    

    return res.data
}

export const getAllPosts  = async(formdata)=>{
    const res =  await axios.get("/posts",formdata)
    console.log(res)
      return res.data
}

export const createPost = async (formData) => {
  const res = await axios.post("/posts", formData)
  return res.data
}

export const likePost = async (postId) => {
  const res = await axios.put(`/posts/${postId}/like`)
  return res.data
}

export const getComments = async (postId) => {
  const res = await axios.get(`/comments/${postId}`)
  return res.data
}

export const addComment = async (postId, text) => {
  const res = await axios.post(`/comments/${postId}`, { text })
  return res.data
}