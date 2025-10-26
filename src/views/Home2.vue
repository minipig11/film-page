<script setup>
// filepath: /d:/code_repository_2/DayOfAI/day-of-ai-page/src/views/Home.vue
import { testSupabaseConnection, testCourseCheckAuth } from '../utils/supabase';

const testConnection = async () => {
//   const result = await testSupabaseConnection();
  const result = await testCourseCheckAuth('1111');
  if (result) {
    console.log('Supabase 连接测试成功！');
  } else {
    console.error('Supabase 连接测试失败！');
  }
};

// 页面加载时执行测试
testConnection();
</script>

<template>
  <div class="home">
    <h1>Supabase 测试页面</h1>
    <p>请查看控制台以获取测试结果。</p>
  </div>
</template>

<style scoped>
.home {
  padding: 20px;
  font-family: Arial, sans-serif;
}
</style>