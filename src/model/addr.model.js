
const { DataTypes } = require('sequelize');
const seq = require('../db/seq');

// 创建模型
const Address = seq.define('mall_address', {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '用户id'
  },
  consignee: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '收货人'
  },
  phone: {
    type: DataTypes.CHAR(11),
    allowNull: false,
    comment: '手机号'
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '收货地址'
  },
  is_default: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    comment: '是否默认地址'
  },
})

// 强行同步数据库（创建数据表）
// Address.sync({ force: true })

module.exports = Address