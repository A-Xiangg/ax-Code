import Mock from 'mockjs' // 引入mockjs

const Random = Mock.Random ;// Mock.Random 是一个工具类，用于生成各种随机数据

let data = [] ;// 用于接受生成数据的数组
let size = [
  '300x250', '250x250', '240x400', '336x280',
  '180x150', '720x300', '468x60', '234x60',
  '88x31', '120x90', '120x60', '120x240',
  '125x125', '728x90', '160x600', '120x600',
  '300x600'
] ;// 定义随机值
// 定义随机值
for (let i = 0; i < 5; i++) { // 可自定义生成的个数
  let template = {
    'list|1-1': [{'id|+1': 1}],// 属性 id 是一个自增数，起始值为 1，每次增 1
    'Boolean': Random.boolean, // 可以生成基本数据类型
    'Natural': Random.natural(1, 10000), // 生成1到10000之间自然数
    'Integer': Random.integer(1, 10000), // 生成1到10000之间的整数
    'Float': Random.float(0, 100, 0, 5), // 生成0到100之间的浮点数,小数点后尾数为0到5位
    'Character': Random.character(), // 生成随机字符串,可加参数定义规则
    'String': Random.string(2, 10), // 生成2到10个字符之间的字符串
    'Range': Random.range(0, 10, 2), // 生成一个随机数组
    'Date': Random.date(), // 生成一个随机日期,可加参数定义日期格式
    'Image': Random.image(Random.size, '#02adea', 'Hello'), // Random.size表示将从size数据中任选一个数据
    'Color': Random.color(), // 生成一个颜色随机值
    'Paragraph': Random.paragraph(2, 5), // 生成2至5个句子的文本
    'Name': Random.cname(), // 生成姓名
    'Url': Random.url(), // 生成web地址
    'age|0-1': 1, //随机生成一个数字 大小在0到1
    'Address': Random.province(), // 生成地址
    'Remark': Random.cparagraph(1, 3), // 生成备注
    'Balance': Random.natural(1, 100000), // 生成余额
    'phone': /^1[385][1-9]\d{8}/, // 生成手机号
    'email': '@email', // 生成email
    'status': Random.natural(0, 1)// 生成0,1
  }
  data.push(template)
}

export default data
