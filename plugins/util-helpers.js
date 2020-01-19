import Compressor from 'compressorjs'

export function compressImage (image) {
    let quality = 0.4
    if(image.size > 1000000) {
        quality = 0.2
    }
    return new Promise((resolve, reject)=>{
        new Compressor(image, {
            quality: quality,
            convertSize: 1000000,
            checkOrientation: false,
            success(result) {
                resolve(result)
            },
            error(e) {
                console.log(e.message)
                reject(e)
            },
        });
    })
}