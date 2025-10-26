import { createPinia } from 'pinia';

//pinia持久化存储插件
import piniaPluginPersist from 'pinia-plugin-persist';

const store = createPinia();
//use使用插件
store.use(piniaPluginPersist);

export default store;