const {
  fileUploadError,
  unSupportedFileType,
  publishGoodsError,
} = require("../constant/error.type");
const {
  createGoods
} = require("../service/goods.service");
class GoodsController {
  async upload(ctx, next) {
    const { file } = ctx.request.files;
    // console.log("file", file);
    if (file) {
      const fileType = ["image/png", "image/jpeg"];
      if (!fileType.includes(file.mimetype)) {
        return ctx.app.emit("error", unSupportedFileType, ctx);
      }

      ctx.body = {
        code: 0,
        message: "upload success",
        result: {
          goods_img: file.newFilename,
        },
      };
    } else {
      return ctx.app.emit("error", fileUploadError, ctx);
    }
  }

  async create(ctx, next) {
    try {
      // 调用service的createGoods方法
      const {createdAt, updatedAt, ...res} = await createGoods(ctx.request.body);
      ctx.body = {
        code: 0,
        message: "发布商品成功",
        result: res,
      };
    } catch (err) {
      return ctx.app.emit("error", publishGoodsError, ctx);
    }
  }
}

module.exports = new GoodsController();
