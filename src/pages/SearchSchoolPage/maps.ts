import * as Enum from './enum'

export const provinceMap = new Map([
  ['新疆维吾尔自治区', Enum.province.Xinjiang],
  ['广西壮族自治区', Enum.province.Guangxi],
  ['湖南省', Enum.province.Hunan],
  ['北京市', Enum.province.Beijing],
  ['天津市', Enum.province.Tianjin],
  ['上海市', Enum.province.Shanghai],
  ['重庆市', Enum.province.Chongqing],
  ['河北省', Enum.province.Hebei],
  ['山西省', Enum.province.Shanxi],
  ['内蒙古自治区', Enum.province.InnerMongolia],
  ['辽宁省', Enum.province.Liaoning],
  ['吉林省', Enum.province.Jilin],
  ['黑龙江省', Enum.province.Heilongjiang],
  ['江苏省', Enum.province.Jiangsu],
  ['浙江省', Enum.province.Zhejiang],
  ['安徽省', Enum.province.Anhui],
  ['福建省', Enum.province.Fujian],
  ['江西省', Enum.province.Jiangxi],
  ['山东省', Enum.province.Shandong],
  ['河南省', Enum.province.Henan],
  ['湖北省', Enum.province.Hubei],
  ['广东省', Enum.province.Guangdong],
  ['海南省', Enum.province.Hainan],
  ['四川省', Enum.province.Sichuan],
  ['贵州省', Enum.province.Guizhou],
  ['云南省', Enum.province.Yunnan],
  ['西藏自治区', Enum.province.Tibet],
  ['陕西省', Enum.province.Shaanxi],
  ['甘肃省', Enum.province.Gansu],
  ['青海省', Enum.province.Qinghai],
  ['宁夏回族自治区', Enum.province.Ningxia],
  ['香港特别行政区', Enum.province.HongKong],
  ['澳门特别行政区', Enum.province.Macau],
  ['台湾省', Enum.province.Taiwan],
  ['全国', Enum.province.None],
])

export const proviceDataMap = new Map([
  [Enum.province.Henan, 'files/bloge7c3ac71beb11bab2eec9d0b6b3478d9.json'],
  [Enum.province.Hubei, 'files/blog0ff6bdf7e69aa8167205091a21348312.json'],
  [Enum.province.Guangdong, 'files/blogb6618ef45ca26e3c66ab149ac5f1e8cc.json'],
  [Enum.province.Beijing, 'files/blog762f35dcdfdb2454963ac17f30ed51b4.json'],
  [Enum.province.Shanghai, 'files/bloga7b15c0ffeca18e230aaf71eaa071cba.json'],
  [Enum.province.Zhejiang, 'files/blogad11cc78181310bfd9a264bdb4d7f923.json'],
  [Enum.province.Fujian, 'files/blog0db4d0018493f0bdb1317f8f76494845.json'],
  [Enum.province.Jiangxi, 'files/blog8a97e1df367a82b3a289fc2de0aa125a.json'],
  [Enum.province.Shandong, 'files/blog63b614c2b64f91dc1af50e9249b9064d.json'],
  [Enum.province.Tianjin, 'files/blogbf6820899f8b9097dd87e1787fa2483e.json'],
  [Enum.province.Guangxi, 'files/blog98dbe4fff41f52086addf5d115236ea1.json'],
  [Enum.province.Chongqing, 'files/blog94f10703705e3b9eddfc0fef076a08c9.json'],
  [Enum.province.Sichuan, 'files/blog944fe675b05339e73b7319fd83c0bd7e.json'],
  [Enum.province.Anhui, 'files/blogc533e0653f87cb54cea395d439899733.json'],
  [Enum.province.Jiangsu, 'files/blog755fe42c7bd752e4639eb2c57aaa1f4b.json'],
  [Enum.province.Hunan, 'files/blog4479ffc6ac8c1ae178c3acabaa2bb446.json'],
  [Enum.province.Guizhou, 'files/blog536a05acaf3582afe0997f34354176c2.json'],
  [Enum.province.Yunnan, 'files/blog7652fc7ad1ce040570021a1e098f221b.json'],
  [Enum.province.Hainan, 'files/blog52e061459d5a515610bdddbaa278ae73.json'],
  [Enum.province.Hebei, 'files/bloga33c1aeb72121cc9e4dd53900ad4499b.json'],
  [Enum.province.Shanxi, 'files/bloge8c48e1efa44ea3e7209a212224eabfb.json'],
  [Enum.province.Liaoning, 'files/blog6697e0b9c891555fa0861495c62295b0.json'],
  [Enum.province.Jilin, 'files/blog23983de192c0e5d75ab8aae06d5f6417.json'],
  [
    Enum.province.Heilongjiang,
    'files/blogb7b6d1ec5b854b127f6038e914942bc6.json',
  ],
  [Enum.province.Qinghai, 'files/blog27f639a8114b36eb9d9815a16754d096.json'],
  [Enum.province.Xinjiang, 'files/blog490643e90bc37480b48a350b9d2f8f78.json'],
  [Enum.province.Ningxia, 'files/blog2f96ea15dfc02084b606e156a7ab34a9.json'],
  [
    Enum.province.InnerMongolia,
    'files/bloga9338e4013ef07ec7a3ac604b762e30f.json',
  ],
  [Enum.province.Gansu, 'files/bloged2fc1445e4c81551c01d0a70aa64935.json'],
  [Enum.province.Shaanxi, 'files/blog371d3d77f07e61823959c18a09a0777e.json'],
  [Enum.province.Taiwan, 'files/blogea0be0a0f85316d02cb0edc06468e45d.json'],
  [Enum.province.Tibet, 'files/blogfea42f3e6b02803679d2df20bd91e2bd.json'],
  [Enum.province.HongKong, 'files/bloga68ee7ce25ce905813b7bc1aba916e0c.json'],
  [Enum.province.Macau, 'files/blog753d411b0690bb4d237ba60051fb4402.json'],
  [Enum.province.None, 'files/blogcb2ba75ad5f4a65bb00b748889479f93.json'],
  // 可根据需要继续添加其他省份
])

export const reverseProvinceMap = new Map([
  [Enum.province.Xinjiang, '新疆维吾尔自治区'],
  [Enum.province.Guangxi, '广西壮族自治区'],
  [Enum.province.Hunan, '湖南省'],
  [Enum.province.Beijing, '北京市'],
  [Enum.province.Tianjin, '天津市'],
  [Enum.province.Shanghai, '上海市'],
  [Enum.province.Chongqing, '重庆市'],
  [Enum.province.Hebei, '河北省'],
  [Enum.province.Shanxi, '山西省'],
  [Enum.province.InnerMongolia, '内蒙古自治区'],
  [Enum.province.Liaoning, '辽宁省'],
  [Enum.province.Jilin, '吉林省'],
  [Enum.province.Heilongjiang, '黑龙江省'],
  [Enum.province.Jiangsu, '江苏省'],
  [Enum.province.Zhejiang, '浙江省'],
  [Enum.province.Anhui, '安徽省'],
  [Enum.province.Fujian, '福建省'],
  [Enum.province.Jiangxi, '江西省'],
  [Enum.province.Shandong, '山东省'],
  [Enum.province.Henan, '河南省'],
  [Enum.province.Hubei, '湖北省'],
  [Enum.province.Guangdong, '广东省'],
  [Enum.province.Hainan, '海南省'],
  [Enum.province.Sichuan, '四川省'],
  [Enum.province.Guizhou, '贵州省'],
  [Enum.province.Yunnan, '云南省'],
  [Enum.province.Tibet, '西藏自治区'],
  [Enum.province.Shaanxi, '陕西省'],
  [Enum.province.Gansu, '甘肃省'],
  [Enum.province.Qinghai, '青海省'],
  [Enum.province.Ningxia, '宁夏回族自治区'],
  [Enum.province.HongKong, '香港特别行政区'],
  [Enum.province.Macau, '澳门特别行政区'],
  [Enum.province.Taiwan, '台湾省'],
  [Enum.province.None, '全国'],
])
