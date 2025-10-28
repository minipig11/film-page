<template>
  <div class="order-required-container">
    <div class="content-box">
      <p class="intro-text">提供以下影视/游戏信息：</p>
      <ul class="title-list">
        <li v-for="(title, index) in titles" :key="index">
          {{ title }}
        </li>
      </ul>
      <p class="intro-text">打开闲鱼扫一扫，点"我想要"吧～。无人值守24h【自动秒发货】！</p>
      <img :src="orderUrl || '../assets/logo.svg'" alt="Order Required" class="order-image" />
      <button @click="goHome" class="go-home-button">返回首页</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getOrderUrl } from '../utils/ossServer';
import { episodeTitle } from '../config/index.js';

const router = useRouter();
const route = useRoute();

const orderUrl = ref('');
const titles = ref(Object.values(episodeTitle).map((item) => item.title)); // 提取标题信息

onBeforeMount(async () => {
  orderUrl.value = await getOrderUrl();
});

const goHome = () => {
  router.push(`/`);
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

.title-list {
  list-style: disc; /* 使用小圆点作为列表项符号 */
  padding-left: 20px; /* 增加左边距，使圆点和内容对齐 */
  margin: 20px 0;
}

.title-list li {
  font-size: 1rem;
  color: #333;
  margin-bottom: 10px;
  text-align: left; /* 确保文本左对齐 */
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