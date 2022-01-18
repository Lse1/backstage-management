// 这个js文件就是用于管理各种接口地址的
import Network from './network'
// 0: pc
//
// 1: android
//
// 2: iphone
//
// 3: ipad
// export const getBanner = () => Network.get('/banner?type=2')
export const getBanner = (data) => {
  // console.log('result')
  return new Promise(function (resolve, reject) {
    // console.log('123')
    Network.get('/tabledata', data)
      .then(function (result) {
        resolve(result)
      })
      .catch(function (err) {
        // console.log('12345')
        reject(err)
      })
  })
}
export const getLogin = (data) => Network.post('/login', data)
export const getTableName = () => Network.get('/table_name')
export const getUserdata = () => Network.get('/userdata')
export const getVideodata = () => Network.get('/videodata')
export const getOrderdata = () => Network.get('/orderdata')
export const getDate = () => Network.get('/date')
export const getCommodity = (data) => Network.get('/commodity/data', data)
export const getCommodityCount = (data) => Network.get('/commodity/count', data)
export const getCommodityIncrease = (data) => Network.get('/commodity/increase', data)
export const getCommodityDelete = (data) => Network.get('/commodity/delete', data)
export const getCommodityRevise = (data) => Network.get('/commodity/revise', data)
export const getCommoditySearch = (data) => Network.get('/commodity/search', data)
export const getPost = (data) => {
  // console.log('result')
  return new Promise(function (resolve, reject) {
    // console.log('123')
    // console.log(data)
    Network.post('/api/register/login', data)
      .then(function (result) {
        // resolve(result.artists)
        // console.log('1234')
        console.log(result)
      })
      .catch(function (err) {
        // console.log('12345')
        reject(err)
      })
  })
}

export const getPostin = (data) => {
  // console.log('result')
  return new Promise(function (resolve, reject) {
    // console.log('123')
    // console.log(data)
    Network.post('/api/register/re', data)
      .then(function (result) {
        // resolve(result.artists)
        // console.log('1234')
        console.log(result)
      })
      .catch(function (err) {
        // console.log('12345')
        reject(err)
      })
  })
}
