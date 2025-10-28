export const OSS_BASE_URL = 'https://dayofaicurriculum.oss-cn-shenzhen.aliyuncs.com/'; 
export const PICTURE_BASE_URL = 'https://liulantupian.sicilyhuang.top/video/'; 

// 定义不同的数组内容
export const episodeData = {
    default: Array.from({ length: 34 }, (_, i) => ({
      title: '沉默的荣耀',
      type: 'basic',
      level: '初级',
      ageRange: '(5-7 岁)',
      description: '沉默的荣耀',
      courseWareId: `ai_basic_${i + 1}`,
      name: `第${i + 1}集`,
    })),
    advanced: Array.from({ length: 20 }, (_, i) => ({
      title: '帝国时代4',
      type: 'advanced',
      level: '高级',
      ageRange: '(15-18 岁)',
      description: '帝国时代4内容',
      courseWareId: `ai_advanced_${i + 1}`,
      name: `第${i + 1}集`,
    })),
  };
  
  export const episodeTitle = {
    default: {
      title: '沉默的荣耀',
      type: '无',
      area: '大陆',
      age: '2025-09-30',
      description: '1949年8月，本来要在福州迎接解放的吴石，突然被蒋介石任命为国民政府国防部次长。为了获得更多情报，吴石按照党组织的指示毅然前往台湾就职，利用工作便利陆续向中共华东局提供了有关金门岛兵力变化、西南战役国军调动等重要情报。原本要回上海的朱枫在得知吴石原来的交通员牺牲、组织上需要派新的交通员去台湾时，也毅然放弃了阖家团圆的机会，只身去了台湾。吴石、朱枫密切合作，送出了多份重要情报。1950年2月，由于叛徒出卖，吴石、朱枫、陈宝仓和聂曦等人不幸被捕，牺牲在台北西马场町，但他们送出的舟山兵力部署图帮助解放军顺利解放舟山群岛，为全国解放事业作出了贡献。',
      dictor: '杨亚洲',
      actor: '马晓伟  霍青  秦焰  于和伟  李健  喻恩泰  傅程鹏  郝平  吴越  巩峥  魏晨  徐佳  郑晓宁  徐洪浩  曾黎  谭凯  黄俊鹏  余皑磊  艾东  曹磊  张晞临  郑家彬  那志东  隆妮',
    },
    advanced: {
      title: '帝国时代4',
      type: 'advanced',
      area: '高级',
      age: '(15-18 岁)',
      description: '帝国时代4内容',
      dictor: '杨亚洲',
      actor: '马晓伟',
    },
  };
  