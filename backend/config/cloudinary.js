import {v2 as cloudinary} from 'cloudinary';
import {config} from 'dotenv';

config(); 

const connectCloudinary = async () => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_SECRET_KEY,
        secure: true  
    });

}

export default connectCloudinary;