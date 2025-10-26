import OSS from 'ali-oss';
import { render } from 'vue';

const client = new OSS({
  region: import.meta.env.VITE_OSS_REGION,
  accessKeyId: import.meta.env.VITE_OSS_ACCESS_KEY_ID,
  accessKeySecret: import.meta.env.VITE_OSS_ACCESS_KEY_SECRET,
  bucket: import.meta.env.VITE_OSS_BUCKET,
});

// Add debug logging before dotenv.config()
// console.log('.env.local:', {
//   OSS_REGION: import.meta.env.VITE_OSS_REGION,
//   OSS_ACCESS_KEY_ID: import.meta.env.VITE_OSS_ACCESS_KEY_ID,
//   OSS_ACCESS_KEY_SECRET: import.meta.env.VITE_OSS_ACCESS_KEY_SECRET,
//   bucket: import.meta.env.VITE_OSS_BUCKET,
// });

/**
 * 生成带签名的 OSS 视频文件访问 URL
 * @param {string} filePath OSS 文件路径（相对于 Bucket 根目录）
 * @param {number} expires URL 有效期（秒）
 * @returns {Promise<string>} 带签名的访问 URL
 */
export const getSignedOssVideoUrl = async (courseId, chapterId, expires = 3600) => {
   // 异步生成签名 URL
    const videoFilePath = courseId + "/" + courseId + chapterId + ".mp4" ;
    let url = '';
    try {
      url  = await client.signatureUrl(videoFilePath, { expires });
    } catch (error) {
      console.error('生成签名 URL 时出错:', error);
    }

    console.log('生成的签名 OSS 视频 URL:', url );
    return url;
};

export const getLocalOssVideoUrl = async (courseId, chapterId, expires = 3600) => {
  // 异步生成签名 URL
   const videoFilePath = "video/" + courseId + "/" + chapterId + ".mp4" ;
   let url = '';
   try {
     url  = await client.signatureUrl(videoFilePath, { expires });
   } catch (error) {
     console.error('生成签名 URL 时出错:', error);
   }

   console.log('生成的签名 OSS 视频 URL:', url );
   return url;
};

export const getOrderUrl = async (expires = 3600) => {
  // 异步生成签名 URL
  let url = "images/order.jpg" ;
   try {
     url  = await client.signatureUrl(url, { expires });
   } catch (error) {
     console.error('生成签名 URL 时出错:', error);
   }

   console.log('生成的订购 URL:', url );
   return url;
};

export const getOssDocUrl = async (videoFilePath, expires = 3600) => {
  // 异步生成签名 URL
   let url = '';
   try {
     url  = await client.signatureUrl(videoFilePath, { expires });
   } catch (error) {
     console.error('生成签名 URL 时出错:', error);
   }

   console.log('生成的签名 OSS 视频 URL:', url );
   return url;
};

// 辅助函数：根据 courseId 和 chapterId 获取中文标题
export const getCourseAndChapterTitle = (courseId, chapterId) => {
  let title = '';
  switch (courseId) {
    case 'basic_what_is_ai':
      title = '什么是 AI？：8-11 岁';
      break;
    case 'basic_machine_learning':
      title = '机器如何学习？： 8-18 岁';
      break;
    case 'basic_gen_ai':
      title = '2024 年 12 月更新-机器如何创造？：8-18 岁';
      break;
    case 'basic_ethics':
      title = 'AI 与伦理辩论：12-18 岁';
      break;
    case 'art_ai':
      title = 'AI 和创意艺术 [12-18 岁]';
      break;
    case 'app_creativity':
      switch (chapterId) {
        case 'Using AI for Creativity':
          title = '使用 AI 实现创造力';
          break;
        case 'Do We Think Like AI':
          title = '我们像 AI 一样思考吗？';
          break;
        case 'What is Creativity-Slides':
          title = '什么是创造力？-幻灯片';
          break;
        case 'Yarn Class Project':
          title = '纱线课堂项目';
          break;
        default:
          title = '使用 AI 实现创造力';
          break;
      }
      break;
    case 'app_chatgpt':
      title = '学校中的 ChatGPT：8-18 岁';
      break;
    case 'social_media_ai':
      switch (chapterId) {
        case 'recommand system':
          title = '推荐系统';
          break;
        case 'It is true':
          title = '这是真的';
          break;
        case 'Socal Media':
          title = '社交媒体';
          break;
        default:
          title = '了解社交媒体中的 AI：14-18 岁';
          break;
      }
      break;
    case 'advanced_data_activism':
      switch (chapterId) {
        case 'lesson 1- introduction to data activism':
          title = '第一课-数据行动主义导论';
          break;
        case 'lesson 2- introto python p1':
          title = '第二课-Python 简介 P1';
          break;
        case 'lesson 3- introto python p2':
          title = '第三课-Python 简介 P2';
          break;
        case 'lesson 4- daisy model':
          title = '第四课-Daisy 模型';
          break;
        case 'lesson 5- data in google sheets':
          title = '第五课-Google 表格中的数据';
          break;
        case 'lesson 6- visualizing data':
          title = '第六课-数据可视化';
          break;
        default:
          title = 'AI 如何量化我们？（带编码）';
          break;
      }
      break;
    case 'climate_story':
      switch (chapterId) {
        case 'lesson 1- Data as Narrative':
          title = '第一课-作为叙事的数据';
          break;
        case 'lesson 2- Explore Data with Python':
          title = '第二课-用 Python 探索数据';
          break;
        case 'lesson 3- Visualize data with Python':
          title = '第三课-用 Python 可视化数据';
          break;
        case 'lesson 4- Predict trends with machine learning':
          title = '第四课-用机器学习预测趋势';
          break;
        case 'lesson 5- Independent data analysis project':
          title = '第五课-独立数据分析项目';
          break;
        default:
          title = '用数据讲述气候故事';
          break;
      }
      break;
    default:
      title = '';
      break;
  }
  return title;
};

export const getPlayUrl = (courseId, chapterId) =>
{
  // 根据 courseId 加载具体playurl
  let play_url;
  if (courseId === 'basic_what_is_ai') {
    play_url = 'http://xhslink.com/a/FzHCt05jRnQfb';
  } else if (courseId === 'basic_machine_learning') {
    play_url = ' http://xhslink.com/a/AFPHM3cbbpQfb';
  }else if (courseId === 'basic_gen_ai') {
    play_url = 'http://xhslink.com/a/fkpaWERawpQfb';
  }else if (courseId === 'basic_ethics') {
    play_url = 'http://xhslink.com/a/kiVT7tbKJpQfb';
  }else if (courseId === 'art_ai') {
    play_url = ' http://xhslink.com/a/3wJgbCmTBqQfb';
  } else if (courseId === 'app_creativity') {
      if (chapterId === 'Using AI for Creativity') {
        play_url = 'http://xhslink.com/a/7xyLJbZglsQfb';
      } else if (chapterId === 'Do We Think Like AI') {
        play_url = 'http://xhslink.com/a/9wnoTrIcIsQfb';
      } else if (chapterId === 'What is Creativity-Slides') {
        play_url = 'http://xhslink.com/a/Cg54PE00YsQfb';
      } else if (chapterId === 'Yarn Class Project') {
        play_url = 'http://xhslink.com/a/KiodFdAq9sQfb';
      } 
  } else if (courseId === 'app_chatgpt') {
    play_url = 'http://xhslink.com/a/dNvmdnPxntQfb';
  } else if (courseId === 'social_media_ai') {
    if (chapterId === 'recommand system') {
        play_url = 'http://xhslink.com/a/0C6Lx91i7tQfb';
      } else if (chapterId === 'It is true') {
        play_url = 'http://xhslink.com/a/Hxxs3oLzluQfb';
      } else if (chapterId === 'Socal Media') {
        play_url = 'http://xhslink.com/a/DIE05iKdAuQfb';
      }
  } else if (courseId === 'advanced_data_activism') {
    if (chapterId === 'lesson 1- introduction to data activism') {
        play_url = 'http://xhslink.com/a/7Henh9cqtvQfb';
      } else if (chapterId === 'lesson 2- introto python p1') {
        play_url = 'http://xhslink.com/a/bMCrnY30GvQfb';
      } else if (chapterId === 'lesson 3- introto python p2') {
        play_url = 'http://xhslink.com/a/uLRz6N79RvQfb';
      } else if (chapterId === 'lesson 4- daisy model') {
        play_url = 'http://xhslink.com/a/9peMZQPBfwQfb';
      } else if (chapterId === 'lesson 5- data in google sheets') {
        play_url = ' http://xhslink.com/a/xPf61fQOZDQfb';
      } else if (chapterId === 'lesson 6- visualizing data') {
        play_url = 'http://xhslink.com/a/tU5bxB7ZkEQfb';
      }
  } else if (courseId === 'climate_story') {
    if (chapterId === 'lesson 1- Data as Narrative') {
        play_url = 'http://xhslink.com/a/ZPjBbhYf1EQfb';
      } else if (chapterId === 'lesson 2- Explore Data with Python') {
        play_url = 'http://xhslink.com/a/fRoXao8kuFQfb';
      } else if (chapterId === 'lesson 3- Visualize data with Python') {
        play_url = 'http://xhslink.com/a/9oHTiogw2FQfb';
      } else if (chapterId === 'lesson 4- Predict trends with machine learning') {
        play_url = 'http://xhslink.com/a/R844mkt3hGQfb';
      } else if (chapterId === 'lesson 5- Independent data analysis project') {
        play_url = 'http://xhslink.com/a/mm6n1ERSyGQfb';
      } 
  }
}


/* import express from 'express';

export default router; */