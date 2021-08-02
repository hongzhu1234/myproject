// import axios from 'axios'

//   const instance = axios.create({
//    // baseURL: 'http://localhost:2451/api',
//     baseURL: '/push',
//     // baseURL:'/api',
//     timeout: 50000,
//   });

// export default instance


import axios from 'axios'
  const instance = axios.create({
    baseURL: '/API',
    timeout: 15000,
  });
 export default instance
