const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/auto/upload`;  // Use backticks for template literal

export const uploadFile = async (file) => {
    const formData = new FormData();

    formData.append('file', file);
    formData.append('upload_preset', 'chat-app-file');

    try {
        const res = await fetch(url, {
            method: 'POST',
            body: formData
        });
    
        if (!res.ok) {
            const resData = await res.json();
            throw new Error(`Error: ${resData.error.message}`);
        }
    
        const resData = await res.json();
        return resData;
    } catch (error) {
        console.error("File upload failed:", error);
        throw error; 
    }
};
