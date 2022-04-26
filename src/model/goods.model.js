
const { DataTypes } = require('sequelize');
const seq = require('../db/seq');

// 创建模型
const Goods = seq.define('mall_goods', {
  goods_name: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '商品名称'
  },
  goods_price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    comment: '商品价格'
  },
  goods_stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '商品库存'
  },
  goods_img: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '商品图片的url'
  },
})

// 强行同步数据库（创建数据表）
// Goods.sync({ force: true })

module.exports = Goods