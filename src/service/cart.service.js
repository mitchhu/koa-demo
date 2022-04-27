const { Op } = require('sequelize');
const Cart = require('../model/cart.model');
const Goods = require('../model/goods.model');

class CartService {

  async createOrUpdate(user_id, goods_id) {
    // 根据用户id和商品id查询是否存在该商品
    const res = await Cart.findOne({
      where: {
        [Op.and]: {
          user_id,
          goods_id
        }
      }
    })
    if(res) {
      await res.increment('number')
      return await res.reload()
    } else {
      return Cart.create({
        user_id,
        goods_id
      })
    }
  }

  async findAllCarts(pageNum, pageSize) {
    const offset = (pageNum - 1) * pageSize
    const limit = pageSize * 1
    const { count, rows } = await Cart.findAndCountAll({
      attributes: ['id', 'number', 'selected'],
      offset,
      limit,
      include: {
        model: Goods,
        as: 'goods_info',
        attributes: ['id', 'goods_name', 'goods_price', 'goods_img']
      }
    })

    return {
      pageNum,
      pageSize,
      total: count,
      list: rows
    }
  }

  async updateCarts({id, number, selected}) {
    const res = await Cart.findByPk(id)
    if(!res) return ''
    number !== undefined && (res.number = number)
    selected !== undefined && (res.selected = selected)
    return await res.save()
  }

  async removeCarts(ids) {
    return await Cart.destroy({
      where: {
        id: {
          [Op.in]: ids
        }
      }
    })
  }
  
}


module.exports = new CartService()