<template>
  <div class="home">
    <main>
      <!-- AI基础板块 -->
      <section class="ai-basics">
        <h2>{{episodes_title.title}}</h2>
        <p class="section-desc">
          演员： {{episodes_title.actor}}
        </p><p class="section-desc">类型： {{episodes_title.type}} 地区： {{episodes_title.area}}</p>
        <p class="section-desc">导演： {{episodes_title.dictor}} 上映日期：{{episodes_title.age}}</p>
        <p class="section-desc">
          剧情介绍：{{episodes_title.description}}
        </p>
        <div class="course-grid">
          <CourseCard
            v-for="(episode, index) in episodes"
            :key="index"
            :title="episode.title"
            :type="episode.type"
            :level="episode.level"
            :ageRange="episode.ageRange"
            :description="episode.description"
            :courseWareId="episode.courseWareId"
            @viewCourseWare="viewCourseWare"
          >
            <div class="sub-items">
              <div class="sub-item">
                <span>{{ episode.name }}</span>
                <div class="btn-group">
                  <button
                    class="btn-learn"
                    @click="startPlay(episode.title, episode.name, 'oss')"
                  >
                    开始播放
                  </button>
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
import { ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useUserStore } from '../store/user';
import CourseCard from '../components/CourseCard.vue';
import { testCourseCheckAuth } from '../utils/supabase';
import { episodeData, episodeTitle } from '../config/index.js';

const router = useRouter();
const route = useRoute();
const param = ref(route.params.param || 'default'); // 获取动态参数，默认为 'default'


// 根据参数动态加载数组
const episodes = ref(episodeData[param.value] || episodeData.default);
const episodes_title = ref(episodeTitle[param.value] || episodeTitle.default);

// 监听路由参数变化
watch(
  () => route.params.param,
  (newParam) => {
    param.value = newParam || 'default';
    episodes.value = episodeData[param.value] || episodeData.default;
    episodes_title.value = episodeTitle[param.value] || episodeTitle.default;
  }
);

const startPlay = async (courseId, chapterId, isTrial = 'oss') => {
  console.log('开始学习:', courseId, chapterId, isTrial);

  if (isTrial != 'local') {
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
    router
      .push({
        path: '/CoursePlay',
        query: {
          courseId: courseId,
          chapterId: chapterId,
          isTrial: isTrial,
        },
      })
      .catch((err) => {
        console.error('路由跳转失败:', err);
      });
  } catch (error) {
    console.error('跳转异常:', error);
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