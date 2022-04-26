const {
  fileUploadError,
  unSupportedFileType,
  publishGoodsError,
  invalidGoodsID,
} = require("../constant/error.type");
const {
  createGoods,
  updateGoods,
  removeGoods,
  restoreGoods,
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

  async update(ctx, next) {
    try {
      const res = await updateGoods(ctx.params.id, ctx.request.body);
      if(res) {
        ctx.body = {
          code: 0,
          message: "修改商品成功",
          result: res,
        };
      } else {
        ctx.app.emit('error', invalidGoodsID, ctx);
      }
    } catch (err) {
      return ctx.app.emit("error", {}, ctx);
    }
  }

  async remove(ctx, next) {
    try {
      const res = await removeGoods(ctx.params.id);
      if(res) {
        ctx.body = {
          code: 0,
          message: "下架商品成功",
          result: '',
        };
      } else {
        ctx.app.emit('error', invalidGoodsID, ctx);
      }
    } catch (err) {
      return ctx.app.emit("error", {}, ctx);
    }
  }

  async restore(ctx, next) {
    try {
      const res = await restoreGoods(ctx.params.id);
      if(res) {
        ctx.body = {
          code: 0,
          message: "上架商品成功",
          result: '',
        };
      } else {
        ctx.app.emit('error', invalidGoodsID, ctx);
      }
    } catch (err) {
      return ctx.app.emit("error", {}, ctx);
    }
  }

}

module.exports = new GoodsController();
