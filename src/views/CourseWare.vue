<template>
  <div class="course-ware">
    <main>
      <section class="course-ware-section">
        <h2>{{ courseTitle }}</h2>
        <p class="section-desc">{{ courseDescription }}</p>

        <div class="resource-list">
          <div class="resource-card">
            <div class="resource-divider"></div>
            <div class="resource-header">
              <h3 class="resource-title">教师指南</h3>
              <p class="resource-description">一份面向教师的文档，包含本单元的所有资源、学习目标和活动步骤。</p>
            </div>
            <ul class="document-list">
              <li v-for="doc in teacherGuideDocuments" :key="doc.name" @click="openDocument(doc.url)">{{ doc.name }}</li>
            </ul>
          </div>

          <div class="resource-card">
            <div class="resource-divider"></div>
            <div class="resource-header">
              <h3 class="resource-title">教师幻灯片</h3>
              <p class="resource-description">向您的学生介绍人工智能（AI）以及包含的内容</p>
            </div>
            <ul class="document-list">
              <li v-for="doc in teacherSlidesDocuments" :key="doc.name" @click="openDocument(doc.url)">{{ doc.name }}</li>
            </ul>
          </div>

          <div class="resource-card">
            <div class="resource-divider"></div>
            <div class="resource-header">
              <h3 class="resource-title">学生资源</h3>
              <p class="resource-description">供学生使用的可打印工作表和网站链接。</p>
            </div>
            <ul class="document-list">
              <li v-for="doc in studentResourcesDocuments" :key="doc.name" @click="openDocument(doc.url)">{{ doc.name }}</li>
            </ul>
          </div>
        </div>
      </section>
      <!-- 新增返回按钮容器 -->
      <div class="back-button-container">
        <button class="btn-back" @click="goBack">返回上一级</button>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from '../store/user';
import { getOssDocUrl } from  '../utils/ossServer';
import { testCourseCheckAuth } from '../utils/supabase';

const route = useRoute();
const router = useRouter();
const courseId = ref(route.query.courseId || '');
const courseTitle = ref('课程资料');
const courseDescription = ref('这里将展示与课程相关的资料，包括教师指南、幻灯片和学生资源。');

// 各类文档列表
const teacherGuideDocuments = ref([]);
const teacherSlidesDocuments = ref([]);
const studentResourcesDocuments = ref([]);

onMounted(() => {
  // 根据 courseId 加载具体课程资料
  let url = courseId.value + "/" 
  if (courseId.value === 'ai_basic') {
    courseTitle.value = '什么是 AI？：5-7 岁';
    courseDescription.value = '“什么是 AI？”幼儿课程通过互动活动和讨论向幼儿（5-7 岁）介绍人工智能 （AI）。该课程使用视觉辅助工具和分类练习帮助学生区分人造（人造）物体和自然物体。它用简单的术语解释了智能，并将人类感官与机器传感器联系起来，展示了 AI 驱动的设备如何使用摄像头、麦克风和其他传感器来"看到"和"听到"。学生还参与了一项动手活动，他们设计了自己的 AI 机器人，加强了他们对 AI 如何在人工指导下运行的理解。本课程以反思问题和可选的家庭活动结束，以将学习扩展到课堂之外。';
    teacherGuideDocuments.value = [
      { name: '什么是 AI？：幼儿版 _ 教师指南.docx', url: url+'What is AI_ Early Childhood Edition _ Educator Guide.docx' }
    ];
    teacherSlidesDocuments.value = [
      { name: '什么是 AI？：幼儿版 _ 幻灯片.pptx', url: url+'_What is AI_ For Early Childhood_ Slide Show.pptx' }
    ];
    studentResourcesDocuments.value = [
      { name: '家庭活动_ 建造你自己的 AI 机器人.docx', url: url+'Family Activity_ Build Your Own AI Robot.docx' }
    ];
  } else if (courseId.value === 'basic_what_is_ai') {
    courseTitle.value = '什么是 AI？：8-11 岁';
    courseDescription.value = '学生将首先清楚地了解 AI 是什么，不是什么。然后，他们将了解机器如何获得智能并探索机器学习的三个关键组成部分：收集数据集、训练算法和预测新数据。他们将使用在线工具 Google Quick Draw 看到这一点，其中使用 AI 的计算机甚至在学生完成绘制图像之前就预测每个学生正在绘制的内容。然后，学生将学习算法并尝试编写自己的算法。';
    teacherGuideDocuments.value = [
      { name: '12-18 岁_ 什么是 AI_ _ 教师指南.docx', url: url+'Ages 12-18_ What is AI_ _ Educator Guide.docx' }
    ];
    teacherSlidesDocuments.value = [
      { name: '高年级-什么是 AI_ _ 幻灯片.pptx', url: url+'Upper Grades-What is AI_ _ Slide Show.pptx' }
    ];
    studentResourcesDocuments.value = [
    { name: '快速绘画介绍.mp4', url: url+'introducion to Quick draw.mp4' },
    ];
    // 更多文档...
  } else if (courseId.value === 'basic_machine_learning') {
    courseTitle.value = '机器如何学习？： 8-18 岁';
    courseDescription.value = '学生将使用在线工具 Teachable Machine 来训练自己的机器识别和区分猫和狗的图像。在使用 Teachable Machines 时，他们将了解算法偏见，这是 AI 重要且令人担忧的部分。学生将讨论偏见的影响以及如何避免偏见，以便每个人都成为负责任的 AI 用户和创造者。学生将使用 "Most Likely Machines" 来探索日常场景中的算法和偏见。最后，还有一个可选项目，学生可以进一步深入研究算法偏见，并制作一张实体或数字海报，分享他们对 AI 的学习，并指导社区中的其他人如何能够并且应该以积极和合乎道德的方式使用 AI。';
    teacherGuideDocuments.value = [
      { name: '更新，2024 年 12 月-机器如何学习 _ 教师指南.docx', url: url+'_Updated, Dec. 2024-How Do Machines Learn_ _ Educator Guide.docx' }
    ];
    teacherSlidesDocuments.value = [
      { name: '更新，2024 年 12 月-机器如何学习 _ 幻灯片.pptx', url: url+'_Updated, Dec. 2024-How Do Machines Learn_ _ Slide Show.pptx' }
    ];
    studentResourcesDocuments.value = [
      { name: '可教学机器伙伴工作表.docx', url: url+'Teachable Machine Partner Worksheet.docx' }
    ];
    // 更多文档...
  }else if (courseId.value === 'basic_gen_ai') {
    courseTitle.value = '2024 年 12 月更新-机器如何创造？：8-18 岁';
    courseDescription.value = '学生首先了解生成式 AI ，了解什么是生成式对抗网络 （GAN） 以及 GAN 如何使用 AI 制作艺术和其他媒体。作为一个班级，他们将努力创建一个人类的 GAN 表示，然后使用真实的 GAN 为班级书籍制作一系列独特的插图。然后，他们将面临 GAN 创建的深度伪造和其他形式的数据纵。本课程最后讨论了 AI 制作内容的一些道德影响，并让学生就所有人如何能够并且应该以合乎道德和负责任的方式使用 AI 提出自己的建议。';
    teacherGuideDocuments.value = [
      { name: '更新，2024 年 12 月-机器如何创造 _ 教师指南.docx', url: url+'_Updated, Dec. 2024-How Do Machines Create_ _ Educator Guide.docx' }
    ];
    teacherSlidesDocuments.value = [
      { name: '更新，2024 年 12 月-机器如何创造 _ 幻灯片.pptx', url: url+'_Updated, Dec. 2024-How Do Machines Create_ _ Slide Show.pptx' }
    ];
    studentResourcesDocuments.value = [
    ];
    // 更多文档...
  }else if (courseId.value === 'basic_ethics') {
    courseTitle.value = 'AI 与伦理辩论：12-18 岁';
    courseDescription.value = '该活动让学生参与探索人工智能 （AI） 的道德挑战。通过结构化的课堂辩论，学生将听取主要利益相关者的观点：科技公司、政府、教育工作者和日常用户，以研究现实世界的困境，例如算法偏见、隐私问题和面部识别技术的使用。通过探索不同的观点，学生将发展他们的批判性思维能力，更深入地理解合乎道德的 AI 使用，并反思平衡创新与安全和公平的复杂性。';
    teacherGuideDocuments.value = [
      { name: 'AI 伦理辩论 _ 教师指南.docx', url: url+'_AI Ethics Debate _ Educator Guide.docx' }
    ];
    teacherSlidesDocuments.value = [
      { name: '准备 AI 伦理辩论 _ 幻灯片.pptx', url: url+'_Preparing for an AI Ethics Debate _ Slide Show.pptx' }
    ];
    studentResourcesDocuments.value = [
    ];
    // 更多文档...
  }else if (courseId.value === 'art_ai') {
    courseTitle.value = 'AI 和创意艺术 [12-18 岁]';
    courseDescription.value = 'AI and the Creative Arts 向学生介绍 AI 和创造力的交叉点，探索其对音乐、视觉艺术、写作、电影和数字媒体的影响。通过四节课，学生将研究 AI 生成的艺术，比较人类和机器的创造力，并讨论所有权、偏见和错误信息等道德问题。实践活动包括使用 AI 工具创建图像、音乐和故事，最终在一场辩论中，学生扮演利益相关者的角色来论证 AI 在艺术中的作用。其他项目，例如 AI 生成的自画像和道德意识海报，可以加深参与度。评估包括讨论、反思和最后的辩论，培养批判性思维和创造性探索。';
    teacherGuideDocuments.value = [
      { name: '高年级_ 教师指南 - AI 与创意艺术.docx', url: url+'_Upper Grades_ Educator Guide - AI and the Creative Arts.docx' }
    ];
    teacherSlidesDocuments.value = [
      { name: '高年级_ 幻灯片 - AI 与创意艺术.pptx', url: url+'_Upper Grades_ Slide Deck - AI and the Creative Arts.pptx' }
    ];
    studentResourcesDocuments.value = [
    ];
    // 更多文档...
  } else if (courseId.value === 'app_creativity') {
    courseTitle.value = '使用 AI 实现创造力';
    courseDescription.value = '在本课程中，学生将探索自己的创造力，了解什么是创造力以及我们如何形成想法，然后将这些与 AI 在创意过程中的作用联系起来。学生首先通过在教师主导的任务中产生想法的形式练习锻炼他们的创造力，然后在一些可以根据你的班级进行调整的任务中测试和完善它们。然后，学生通过一系列课程了解我们如何使用 AI 来增强我们的创造力，让学生深入了解 AI 如何能够解释和理解我们，以及当我们使用 AI 时如何利用这些知识来创建清晰的指令以实现预期的结果。这在课堂项目中达到高潮，学生们将他们所学到的一切放在一起，使用以您的班级或学校为主题的 AI 讲故事应用程序创建一个由他们自己生成的故事。理';
    teacherGuideDocuments.value = [
      { name: '使用 AI 实现创造力教师指南.docx', url: url+'Using AI for Creativity Teacher Guides.docx' }
    ];
    teacherSlidesDocuments.value = [
    { name: '第一课：什么是创造力？-幻灯片.pptx', url: url+'Lesson 1：What is Creativity-Slides.pptx' },
    { name: '第二课：使用 AI 实现创造力-幻灯片.pptx', url: url+'Lesson 2：Using AI for Creativity-Slides.pptx' },
    { name: '第三课：我们像 AI 一样思考吗？-幻灯片.pptx', url: url+'Lesson 3：Do We Think Like AI-Slides.pptx' },
    { name: '第四课：纱线课堂项目-幻灯片.pptx', url: url+'Lesson 4：Yarn Class Project-Slides.pptx' }
    ];
    studentResourcesDocuments.value = [
    ];
    // 更多文档...
  } else if (courseId.value === 'app_chatgpt') {
    courseTitle.value = '学校中的 ChatGPT：8-18 岁';
    courseDescription.value = '本课程是对 ChatGPT 的介绍。 它从学生通过一起写故事来探索自己的创作过程开始。通过一系列由教师主导的活动，他们了解了 ChatGPT、它是什么、它是如何工作的，以及 ChatGPT 用来生成故事和类人对话的过程。考虑到 ChatGPT 的创作过程与他们自己的创作过程有何相似和不同之处，学生们为最后一课做准备：就学校应该如何使用和不使用 ChatGPT 提出建议。';
    teacherGuideDocuments.value = [
      { name: '学校中的 ChatGPT _ 教师指南.docx', url: url+'ChatGPT in Schools _ Educator Guide.docx' }
    ];
    teacherSlidesDocuments.value = [
      { name: '学校中的 ChatGPT _ 幻灯片.pptx', url: url+'ChatGPT in Schools _ Slide Show.pptx' }
    ];
    studentResourcesDocuments.value = [
      
    ];
    // 更多文档...
  }else if (courseId.value === 'rights_ai') {
    courseTitle.value = 'AI 和 AI 工具如何影响我们的权利？';
    courseDescription.value = '该课程指导学生为学校应该如何使用和不应该如何使用人工智能 （AI） 制定公平公正的规则。';
    teacherGuideDocuments.value = [
      { name: 'AI 和 AI 工具如何影响我们的权利 _ 教师指南.docx', url: url+'How Do AI and AI Tools Affect Our Rights_ _ Educator Guide.docx' }
    ];
    teacherSlidesDocuments.value = [
      { name: 'AI 和 AI 工具如何影响我们的权利 _ 幻灯片.pptx', url: url+'How Do AI and AI Tools Affect Our Rights_ _ Slide Show.pptx' }
    ];
    studentResourcesDocuments.value = [
    { name: 'AI 和 AI 工具如何影响我们的权利 _ 学生资源.pptx', url: url+'How Do AI and AI Tools Affect Our Rights_ _ Student Resources.pptx' }
    ];
    // 更多文档...
  } else if (courseId.value === 'social_media_ai') {
    courseTitle.value = '了解社交媒体中的 AI：14-18 岁';
    courseDescription.value = '随着社交媒体平台已成为我们数字生活的支柱，人工智能通过这些平台对人们的影响也越来越大。推荐系统是跨社交媒体平台提供信息源和建议的基础，它定义了我们在网上接触到什么，以及我们没有接触到什么。在本课程中，学生将对 AI 是什么以及它在推荐系统中的工作原理有一个基本的了解——它查看哪些数据，以及它如何选择为我们过滤内容。学生将学习 "clustering" 并使用 clustering 应用程序创建自己的推荐系统。从那里，学生将研究不同形式的错误信息，在社交媒体平台的推荐系统中使用聚类和过滤如何加速错误信息的传播，并探索这些过滤决定对我们个人和社会的社会影响。以道德矩阵为指导，学生将通过就社交媒体平台应如何运作和监管提出自己的建议来完成课程。';
    teacherGuideDocuments.value = [
      { name: '了解社交媒体中的 AI _ 教师指南.docx', url: url+'Understanding AI in Social Media _ Educator Guide.docx' }
    ];
    teacherSlidesDocuments.value = [
      { name: '了解社交媒体中的 AI _ 幻灯片.pptx', url: url+'Understanding AI in Social Media _ Slide Show.pptx' }
    ];
    studentResourcesDocuments.value = [
    { name: '纱线介绍.mp4', url: url+'introducion to yarn.mp4' }
    ];
    // 更多文档...
  } else if (courseId.value === 'advanced_data_activism') {
    courseTitle.value = 'AI 如何量化我们？（带编码）';
    courseDescription.value = 'Python AI 编程课程：14-18 岁';
    teacherGuideDocuments.value = [
      { name: 'AI 如何量化我们？（编码） _ 教师指南.docx', url: url+'How Are We Quantified By AI_ (Coding) _ Educator Guide.docx' }
    ];
    teacherSlidesDocuments.value = [
      { name: 'AI 如何量化我们？（编码） _ 幻灯片.pptx', url: url+'How Are We Quantified By AI_ (Coding) _ Slide Show .pptx' }
    ];
    studentResourcesDocuments.value = [
      { name: 'AI 如何量化我们？（编码） _ 学生工作簿.docx', url: url+'How Are We Quantified By AI_ (Coding) _ Student Workbook.docx' }
    ];
    // 更多文档...
  } else if (courseId.value === 'climate_story') {
    courseTitle.value = '用数据讲述气候故事';
    courseDescription.value = 'Python AI 编程课程：14-18 岁';
    teacherGuideDocuments.value = [
      { name: '用数据讲述气候故事 _ 教师指南.docx', url: url+'Telling Climate Stories with Data _ Educator Guide.docx' }
    ];
    teacherSlidesDocuments.value = [
      { name: '用数据讲述气候故事 _ 2024 AI 日幻灯片.pptx', url: url+'Telling Climate Stories with Data _ 2024 Day of AI Slide Show.pptx' }
    ];
    studentResourcesDocuments.value = [
      { name: '用数据讲述气候故事 _ 2024 AI 日学生工作簿.docx', url: url+'Telling Climate Stories with Data _ 2024 Day of AI Student Workbook.docx' }
    ];
    // 更多文档...
  }
  // 其他 courseId 的逻辑...
});

const checkLogin = () => {
  const userStore = useUserStore();
  const token = userStore.token;

  if (!token) {
    console.warn('用户未登录，请先登录。');
    return null;
  }

  return token;
};

// 打开文档的方法
const openDocument = async (videoFilePath) => {

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

  let url = await getOssDocUrl(videoFilePath);
  console.log('开始学习:', url);
  if (url) {
    window.open(url, '_blank');
  } else {
    console.warn('文档 URL 未提供。');
  }
};

// 新增返回上一级的方法
const goBack = () => {
  router.back();
};
</script>

<style scoped>
.course-ware {
  padding-top: 60px; /* 与 Home.vue 保持一致的顶部填充 */
}

main {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
}

.course-ware-section {
  margin-bottom: 4rem;
}

h2 {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 1rem;
  text-align: center;
}

.section-desc {
  /* Removed: background-color: #E3F2FD; */ /* Remove background from description */
  font-size: 0.95rem;
  color: #555;
  line-height: 1.6;
  flex: 1;
}

.resource-list {
  display: flex;
  flex-direction: column; /* 纵向排列 */
  gap: 2rem; /* 卡片之间的间距 */
  align-items: flex-start; /* 左对齐卡片 */
}

.resource-card {
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: left; /* Changed to left-align content within the card */
  width: 100%;
  /* Removed: max-width: 600px; */ /* Adjust max-width as needed for the wider content */
}

/* New styles for the re-developed resource card */
.resource-divider {
  width: 100%;
  height: 4px;
  background-color: #FF9800; /* Orange color for the line */
  margin-bottom: 2rem; /* Space below the line */
}

.resource-header {
  display: flex;
  align-items: flex-start; /* 将标题和描述顶部对齐 */
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.resource-title {
  background-color: #E3F2FD; /* Light blue background for the title */
  padding: 5px 15px;
  border-radius: 4px;
  font-size: 1.5rem;
  color: #333;
  font-weight: bold;
  display: inline-block;
  margin-right: 15px;
}

.resource-description {
  /* Removed: background-color: #E3F2FD; */ /* Remove background from description */
  font-size: 0.95rem;
  color: #555;
  line-height: 1.6;
  flex: 1;
}

.document-list {
  list-style: none;
  padding: 0;
  margin-top: 15px;
  display: flex; /* Make it a flex container */
  flex-wrap: wrap; /* Allow items to wrap to the next line */
  gap: 15px; /* Add gap between items */
}

.document-list li {
  font-size: 1rem;
  color: #333;
  cursor: pointer;
  text-decoration: underline;
}

.document-list li:hover {
  color: #007bff; /* Change color on hover */
}

/* Keep existing icon-wrapper styles if other cards still use it, otherwise remove or adapt */
.icon-wrapper {
  background-color: #E3F2FD;
  border-radius: 8px;
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto 1.5rem auto;
  font-size: 3rem;
  color: #2196F3;
}

.back-button-container {
  display: flex;
  justify-content: center;
  margin-top: 4rem; /* 根据需要调整与上方内容的间距 */
  margin-bottom: 2rem;
}

.btn-back {
  width: 120px; /* 按钮宽度 */
  height: 40px; /* 按钮高度 */
  line-height: 40px;
  border: 0px;
  outline: none;
  color: #fff;
  background: #388fff; /* 蓝色 */
  border-radius: 12px; /* 圆角 */
  cursor: pointer;
  font-size: 1rem; /* 字体大小 */
  font-weight: bold; /* 字体加粗 */
  transition: background 0.3s ease; /* 过渡效果 */
}

.btn-back:hover {
  background: #1565C0; /* 鼠标悬停时的深蓝色 */
}
</style> 