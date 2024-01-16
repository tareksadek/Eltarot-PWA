import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://tarot-331d9.firebaseio.com/',
})

export default instance
