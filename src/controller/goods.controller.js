const { fileUploadError, unSupportedFileType } = require('../constant/error.type')
class GoodsController {
  async upload(ctx, next) {

    const { file } = ctx.request.files
    
    console.log('file', file)
    
    if(file) {
      const fileType = ['image/png', 'image/jpeg']
      if(!fileType.includes(file.mimetype)) {
        return ctx.app.emit('error', unSupportedFileType, ctx)
      }
      
      ctx.body = {
        code: 0,
        message: 'upload success',
        result: {
          goods_img: file.newFilename
        }
      }
    } else {
      return ctx.app.emit('error', fileUploadError, ctx)
    }
  }
}

module.exports = new GoodsController()