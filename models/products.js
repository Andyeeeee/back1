import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, '缺少名稱']
  },
  price: {
    type: Number,
    required: [true, '缺少價格'],
    min: [0, '價格太低']
  },
  image: {
    type: String,
    required: [true, '缺少圖片']
  },
  description: {
    type: String,
    required: [true, '缺少說明']
  },
  category: {
    type: String,
    required: [true, '缺少分類'],
    enum: {
      values: ['主食', '開胃菜', '飲品', '下午茶'],
      message: '分類錯誤'
    }
  },
  category2: {
    type: String,
    required: [true, '缺少分類2'],
    enum: {
      values: ['青醬', '白醬', '粉紅醬', '義式燉飯', '清炒', '紅醬', '輕鬆點', '炸物拼盤', '特色沙拉', '薄餅披薩', '現磨咖啡', '茶', '鮮榨果汁', '其他', '甜點', '現烤鬆餅', '沐沐三明治', '磚壓吐司'],
      message: '分類錯誤'
    }
  },
  sell: {
    type: Boolean,
    required: [true, '缺少上架狀態']
  }
}, { versionKey: false })

export default mongoose.model('products', schema)
