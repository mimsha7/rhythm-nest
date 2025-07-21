import { ref } from 'vue';
import cloudinaryConfig from '@/cloudinary/config';

const useCloudinaryStorage = () => {
    const error = ref(null);
    const url = ref(null);
    const isPending = ref(false);

    const uploadImage = async (file, path = null) => {
        error.value = null;
        isPending.value = true;
        url.value = null;

        const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`;

        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'project-playlist'); // This is your unsigned preset

        if (path) {
            formData.append('folder', path);
        }

        try {
            const response = await fetch(uploadUrl, {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.error.message || 'Could not upload the image.');
            }

            const data = await response.json();
            url.value = data.secure_url;
            isPending.value = false;

        } catch (err) {
            console.error('Cloudinary upload failed:', err);
            error.value = err.message;
            isPending.value = false;
        }
    };

    const deleteImage = async (coverUrl) => {
        const deleteUrl = `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/destroy`;

        // 1. Extract Public ID from URL
        const publicIdWithExtension = coverUrl.split("/").slice(-3).join("/");
        const publicId = publicIdWithExtension.substring(0, publicIdWithExtension.lastIndexOf('.'));
        
        // 2. Generate Timestamp and Signature
        const timestamp = Math.round((new Date()).getTime() / 1000);
        const stringToSign = `public_id=${publicId}&timestamp=${timestamp}${cloudinaryConfig.apiSecret}`;
        
        const encoder = new TextEncoder();
        const data = encoder.encode(stringToSign);
        const hashBuffer = await crypto.subtle.digest('SHA-1', data);
        
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const signature = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

        // 3. Make the authenticated DELETE request
        const formData = new FormData();
        formData.append('public_id', publicId);
        formData.append('timestamp', timestamp);
        formData.append('api_key', cloudinaryConfig.apiKey);
        formData.append('signature', signature);

        try {
            const response = await fetch(deleteUrl, {
                method: 'POST',
                body: formData
            });

            const responseData = await response.json();
            if (responseData.result !== 'ok') {
                throw new Error(responseData.result || 'Failed to delete image from Cloudinary.');
            }
            console.log('Successfully deleted image from Cloudinary.');

        } catch (err) {
            console.error('Cloudinary delete failed:', err);
            error.value = err.message;
        }
    };

    return { error, url, isPending, uploadImage, deleteImage };
};

export default useCloudinaryStorage; 