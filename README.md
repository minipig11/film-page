# Vue 3 + Vite
npm run dev

npm install -D less
npm i vue3-video-play --save
npm install -D unplugin-auto-import
npm install vue-router@4
npm install @fortawesome/fontawesome-free
npm install vue-router pinia sass 
npm create vite@latest day-of-ai-page 
npm install pinia
npm install ali-oss

cd .\liulantupian-manager\
node src/server.js

# 清理缓存和依赖
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json -Force
npm cache clean --force

# 重新安装依赖
npm install

# 重新构建
npm run build

# 视频文件地址
试看源地址为https://liulantupian.sicilyhuang.top/video/
完整视频和课程资料地址为https://dayofaicurriculum.oss-cn-shenzhen.aliyuncs.com/
