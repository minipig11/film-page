<template>
  <div class="home">
    <main>
      <!-- AI基础板块 -->
      <section class="ai-basics">
        <h2>沉默与荣耀</h2>
        <p class="section-desc">剧情介绍：1949年8月，本来要在福州迎接解放的吴石，突然被蒋介石任命为国民政府国防部次长。为了获得更多情报，吴石按照党组织的指示毅然前往台湾就职，利用工作便利陆续向中共华东局提供了有关金门岛兵力变化、西南战役国军调动等重要情报。原本要回上海的朱枫在得知吴石原来的交通员牺牲、组织上需要派新的交通员去台湾时，也毅然放弃了阖家团圆的机会，只身去了台湾。吴石、朱枫密切合作，送出了多份重要情报。1950年2月，由于叛徒出卖，吴石、朱枫、陈宝仓和聂曦等人不幸被捕，牺牲在台北西马场町，但他们送出的舟山兵力部署图帮助解放军顺利解放舟山群岛，为全国解放事业作出了贡献。</p>
        <div class="course-grid">
          <CourseCard title="沉默的荣耀" type="basic" level="初级" ageRange="(5-7 岁)" description="沉默的荣耀" courseWareId="ai_basic" @viewCourseWare="viewCourseWare">
            <div class="sub-items">
              <div class="sub-item">
                <span>第1集</span>
                <div class="btn-group">
                  <button class="btn-learn" @click="startPlay('沉默的荣耀', '第1集', 'oss')">开始播放</button>
                </div>
              </div>
            </div>
          </CourseCard>
        </div>
      </section>

      
    </main>
  </div>
</template>

<script setup>
// filepath: /d:/code_repository_2/DayOfAI/day-of-ai-page/src/views/Home.vue
import { useUserStore } from '../store/user';
import CourseCard from '../components/CourseCard.vue';
import { useRouter } from 'vue-router';
import { testCourseCheckAuth } from '../utils/supabase';

const router = useRouter();

const startPlay = async (courseId, chapterId, isTrial = 'oss') => {
  console.log('开始学习:', courseId, chapterId, isTrial);

  if(isTrial != 'local') {
    const token = checkLogin();
    if (!token) {
      router.push('/login');
      return;
    }

    const hasOrdered = await testCourseCheckAuth(token);
    if (!hasOrdered) {
      router.push('/login');
      return;
    }
  }

  try {
    router.push({
      path: '/CoursePlay',
      query: {
        courseId: courseId,
        chapterId: chapterId,
        isTrial: isTrial
      }
    }).catch(err => {
      console.error('路由跳转失败:', err)
    })
  } catch (error) {
    console.error('跳转异常:', error)
  }
};

const viewCourseWare = async (courseId) => {
  console.log('查看课程资料:', courseId);
};

const checkLogin = () => {
  const userStore = useUserStore();
  const token = userStore.token;

  if (!token) {
    console.warn('用户未登录，请先登录。');
    return null;
  }

  return token;
};

</script>

<style scoped>
.home {
  padding-top: 60px;
}

main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

section {
  margin-bottom: 4rem;
}

h2 {
  font-size: 2rem;
  color: #333;
  margin-bottom: 1rem;
}

.section-desc {
  color: #666;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.course-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
}

/* 添加课程卡片背景颜色样式 */
:deep(.course-card) {
  position: relative;
}

:deep(.course-card[data-type="basic"]) {
  background-color: #E3F2FD; /* 浅蓝色背景用于基础课程 */
}

:deep(.course-card[data-type="application"]) {
  background-color: #E8F5E9; /* 浅绿色背景用于应用课程 */
}

:deep(.course-card[data-type="advanced"]) {
  background-color: #FFF3E0; /* 浅橙色背景用于高级课程 */
}

.sub-items {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 1rem;
}

/* 修改现有的 .sub-item 样式 */
.sub-item {
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  font-size: 0.875rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.btn-group {
  display: flex;
}

.btn-try {
  width: 70px;
  height: 30px;
  background: #E8E8E8;
  border-radius: 8px;
  outline: none;
  border: none;
  cursor: pointer;
  margin-right: 10px;
  font-size: 14px;
  color: #808080;
}

.btn-try:hover {
  opacity: 0.8;
}

.btn-learn {
  width: 70px;
  height: 30px;
  background: #3B8CFF;
  border-radius: 8px;
  outline: none;
  border: none;
  cursor: pointer;
  font-size: 14px;
  color: #FFFFFF;
}

.btn-learn:hover {
  opacity: 0.8;
}

.btn-try-inline {
  width: 40px;
  height: 20px;
  background: #E8E8E8;
  border-radius: 4px;
  outline: none;
  border: none;
  cursor: pointer;
  font-size: 12px;
  color: #808080;
  margin-left: 5px;
}

.btn-try-inline:hover {
  opacity: 0.8;
}

.ai-basics {
  position: relative;
  padding-top: 160px; /* 减少顶部填充 */
  margin-top: -60px; /* 抵消 home 的 padding-top */
}

.ai-basics::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 140px; /* 减少背景图片高度 */
  background-image: url('../assets/dayofai(1).png'); /* 替换为实际图片路径 */
  background-size: cover;
  background-position: top center; /* 修改为从顶部开始显示图片 */
  background-repeat: no-repeat;
  border-radius: 12px;
  margin: 0; /* 移除所有边距 */
}

.ai-basics h2 {
  position: relative;
  z-index: 1; /* 确保文字在背景图片上层 */
  margin-top: 40px; /* 添加标题上方间距 */
}

.ai-basics .section-desc {
  position: relative;
  z-index: 1; /* 确保文字在背景图片上层 */
  margin-bottom: 30px; /* 添加描述文字下方间距 */
}
</style>