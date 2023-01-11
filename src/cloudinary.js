import {v2 as cloudinary} from 'cloudinary'

//cloudinary config
cloudinary.config({
    cloud_name: process.env.CLOUDI_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})

export default cloudinary