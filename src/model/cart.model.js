
const { DataTypes } = require('sequelize');
const seq = require('../db/seq');

// 创建模型
const Cart = seq.define('mall_carts', {
  goods_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '商品id'
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '用户id'
  },
  number: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
    comment: '商品数量'
  },
  selected: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
    comment: '是否选中'
  },
})

// 强行同步数据库（创建数据表）
// Cart.sync({ force: true })

module.exports = Cart