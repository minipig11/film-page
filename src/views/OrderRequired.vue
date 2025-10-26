<template>
  <div class="order-required-container">
    <div class="content-box">
      <p class="intro-text">
        1949年8月，本来要在福州迎接解放的吴石，突然被蒋介石任命为国民政府国防部次长。为了获得更多情报，吴石按照党组织的指示毅然前往台湾就职，利用工作便利陆续向中共华东局提供了有关金门岛兵力变化、西南战役国军调动等重要情报。原本要回上海的朱枫在得知吴石原来的交通员牺牲、组织上需要派新的交通员去台湾时，也毅然放弃了阖家团圆的机会，只身去了台湾。吴石、朱枫密切合作，送出了多份重要情报。1950年2月，由于叛徒出卖，吴石、朱枫、陈宝仓和聂曦等人不幸被捕，牺牲在台北西马场町，但他们送出的舟山兵力部署图帮助解放军顺利解放舟山群岛，为全国解放事业作出了贡献。
      </p>
      <p class="intro-text">打开闲鱼扫一扫，点"我想要"吧～。无人值守24h【自动秒发货】！</p>
      <img :src="orderUrl || '../assets/logo.svg'" alt="Order Required" class="order-image"/>
      <button @click="goHome" class="go-home-button">返回首页</button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { getOrderUrl } from  '../utils/ossServer';

const router = useRouter();
const orderUrl = ref(''); // 将 orderUrl 定义为 ref

onBeforeMount(async () => {
  orderUrl.value = await getOrderUrl();
});

const goHome = () => {
  router.push('/');
};
</script>

<style scoped>
.order-required-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f0f2f5;
  font-family: Arial, sans-serif;
  padding: 20px;
  box-sizing: border-box;
}

.content-box {
  background-color: #fff;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 800px; /* Adjust as needed */
  width: 100%;
}

.order-image {
  max-width: 100%;
  height: auto;
  display: block;
  margin: 0 auto 20px auto; /* Center image and add bottom margin */
  border-radius: 4px;
}

.message {
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 25px;
  line-height: 1.5;
}

.go-home-button {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.go-home-button:hover {
  background-color: #0056b3;
}

.intro-text {
  font-size: 1rem;
  color: #555;
  line-height: 1.6;
  margin-bottom: 20px;
  text-align: left;
}

.intro-text a {
  color: #007bff;
  text-decoration: underline;
}
</style> 