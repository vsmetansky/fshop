const cloudinary = require('cloudinary');

export default class CloudPhoto {
    static add(buffer: any) {
        return new Promise((resolve, reject) => {
            cloudinary.v2.uploader.upload_stream({
                        resource_type: 'image',
                        image_metadata: true
                    },
                    (error: any, result: any) => {
                        if (error) reject(error);
                        else resolve(result);
                    })
                .end(buffer);
        })
    }
    static rem(id: any) {
        return new Promise((resolve, reject) => {
            cloudinary.v2.uploader.destroy(id,
                (error: any, result: any) => {
                    if (error) reject(error);
                    else resolve(result);
                })
        })
    }
}
