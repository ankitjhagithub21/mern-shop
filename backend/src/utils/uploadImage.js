const imagekit = require("../config/imageKit");

const uploadImage = async(file) => {
    console.log("upload Image called:",file)
    try{
         const result = await imagekit.upload({
          file: file.buffer, // Use buffer if storing in memory
          fileName: file.originalname,
          folder: "/mern-shop", // Optional: specify a folder
        });

        if(result && result.url){
            return result.url
        }
        return null;

    }catch(error){
        console.log("Error uploading image :",error)
        return null
    }
}

// Delete image from ImageKit by file URL
const deleteImage = async (fileUrl) => {
    try {
        // Get file details to retrieve fileId
        const files = await imagekit.listFiles({
            searchQuery: `url = "${fileUrl}"`
        });
        if (files && files.length > 0) {
            const fileId = files[0].fileId;
            await imagekit.deleteFile(fileId);
            return true;
        }
        return false;
    } catch (error) {
        console.log("Error deleting image:", error);
        return false;
    }
}

module.exports = {
    uploadImage,
    deleteImage
}