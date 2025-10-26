import { defineStore } from 'pinia'

export const useUserStore = defineStore({
  id: 'user',
  state: () => {
    return {
      token: '',
      userInfo:{}
    }
  },
  actions:{
    setToken( token ){
      this.token = token;
    },
    setUserInfo( userInfo ){
      this.userInfo = userInfo;
    }
  },
  persist: {
    enabled: true, //开启数据缓存 -->session
    strategies: [{
        key: 'xhs_user', //localStorage的key
        storage: localStorage,  // <==如果要持久化存储，必须写
        // paths: ['token']  //哪个数据要存储
      }]
  }
})