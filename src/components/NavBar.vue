<template>
  <nav class="nav-wrapper" @mouseleave='isShow=false'>
    <div class="nav-content">
      <div class="nav-left">
        <div class='content-login' v-if='!isUserInfo' @click='login'>登录 / 注册</div>
        <div class="content-login-success" v-else>
            <div @mouseenter='isShow=true'>
              <img
                class="avator"
                :src="userInfo.avatar"
                alt=""
                v-if="userInfo.avatar"
              />
              <img v-else class="avator" src='../assets/img/Avat62.png'/>
            </div>
            <div class="avator-info-half">
                <p>{{userInfo.xhsId}}</p>
              </div>
        </div>
        <!-- 划过头像显示  -->
        <div class="user-info" v-if='isShow'>
          <div class="user-info-top">
            <div class="u-i-t-top">
              <img
                class="avator"
                :src="userInfo.avatar"
                alt=""
                v-if="userInfo.avatar"
              />
              <img class="avator" src='../assets/img/Avat62.png' v-else />
              <div class="avator-info">
                <p>{{userInfo.xhsId}}</p>
              </div>
            </div>
          </div>
          <div class="user-info-bottom">
            <div class="logout_left" @click='goHome'>返回首页</div>
            <div class="logout_right" @click='outLogin'>退出登录</div>
          </div>
        </div>
      </div>

      <div class="nav-right">
        <!--router-link to="/" class="logo">
          <img src="../assets/logo.svg" alt="Day of AI Logo">
        </router-link-->
        
        <div class="nav-links">
          <!--div class="nav-item">
            <span>Teachers <i class="fas fa-angle-down"></i></span>
          </div>
          <div class="nav-item">
            <span>School Administrators <i class="fas fa-angle-down"></i></span>
          </div>
          <div class="nav-item">
            <span>international <i class="fas fa-angle-down"></i></span>
          </div>
          <div class="nav-item">
            <span>partners <i class="fas fa-angle-down"></i></span>
          </div>
          <div class="nav-item">
            <span>About Us <i class="fas fa-angle-down"></i></span>
          </div>
          <div class="nav-item">
            <span>contact <i class="fas fa-angle-down"></i></span>
          </div-->
          <router-link to="/" class="nav-item">返回首页</router-link>
          <router-link v-if="userInfo.xhsId === '2367'"  to="/contact" class="nav-item">Contact Us</router-link>
        </div>
      </div>

    </div>
  </nav>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
let router = useRouter();

//返回首页
const goHome = () => {
  isShow.value = false;
  router.push('/');
};

//进入登录页
const login = ()=>{
  isShow.value = false;
	router.push('/login');
}

//引入pinia
import { useUserStore } from '../store/user'
import { storeToRefs } from 'pinia'; // 导入 storeToRefs
// 从 store 中获取响应式的 token 和 userInfo
const userStore = useUserStore();
const { token, userInfo } = storeToRefs(userStore);
//判断用户是否登录状态，直接使用 store 的响应式 token
const isUserInfo = computed(() => token.value !== '');

//显示用户更多数据
let isShow = ref(false);

//退出登录
const outLogin = ()=>{
		// ElMessage({
    //         showClose: true,
    //         message: '退出成功',
    //         type: 'success',
    //     })
    //清除token
    useUserStore().token = '';
    //刷新页面
    router.go(0);	
}
</script>

<style scoped>
.nav-wrapper {
  background: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: relative;
  display: flex;
  width: 100%;
  top: 0;
  z-index: 1000;
}

.nav-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between; /* Changed for login/logout alignment */
  align-items: center;
  width: 100%; /* Ensure it spans full width */
}

.nav-left {
  display: flex;
  align-items: center;
  gap: 3rem;
}

.logo img {
  height: 40px;
}

.nav-links {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.nav-item {
  color: #333333;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.nav-item:hover {
  color: #2c5282;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 2rem;
  justify-content: flex-end; /* Push items to the right */
}

/* Copied and adapted styles from Header.vue */
.content-search{
	display: flex;
	align-items: center;
	padding:5px 10px;
	width: 350px;
	height: 35px;
	background: #F0F2F4;
	border-radius: 8px;
}
.content-search input{
	padding:0 10px;
	width: calc(100% - 22px); /* Adjusted width to account for icon */
	height: 40px;
	border:0;
	border-radius: 8px;
	background: #F0F2F4;
	color:#808080;
	font-size:16px;
	outline: none;
}
.cntent-shopping{
	cursor: pointer;
}
.content-login{
	font-size: 18px;
	color:#808080;
	text-align: center;
	cursor: pointer;
	text-decoration: none;
}
.content-login-success {
	height: 53px;
	color: #808080;
	text-align: center;
	width: auto; /* Changed to auto to adapt to content */
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-size: 18px;
	font-family: Microsoft YaHei;
	font-weight: 400;
	color: #707070;
}
.avator {
	height: 53px;
	width: 53px;
	cursor: pointer;
	border-radius: 50%;
}
.user-info {
	width: 200px;
	height: 194px;
	background-color: #fff;
	border: 1px solid rgba(248, 250, 252, 1);
	box-shadow: 0px 5px 15px 3px #888888;
	position: absolute;
	top: 75px; /* Adjusted relative to nav-wrapper */
	left: 130px; /* Adjusted relative to nav-wrapper */
	z-index: 999;
	display: block;
	border-radius: 10px;
}
.user-info-top {
	display: flex;
	width: 100%;
	height: 160px;
	border-bottom: 1px solid rgba(248, 250, 252, 1);
	flex-direction: column;
}
.u-i-t-top {
	display: flex;
	height: 80px;
	width: 100%;
	align-items: center;
}
.u-i-t-top img {
	width: 40px;
	height: 40px;
	margin: 0 10px;
	cursor: pointer;
}
.avator-info {
	width: 120px;
	height: 60px;
	font-size: 14px;
	font-family: Microsoft YaHei;
	font-weight: 400;
	color: #333333;
	display: flex;
	flex-direction: column;
}
.avator-info p {
	height: 40px;
	line-height: 40px;
	cursor: pointer;
}
.u-i-i-bottom {
	display: flex;
	height: 100px;
	width: 200px;
	margin-top: 10px;
	flex-wrap: wrap;
	justify-content: space-around;
}
.u-i-i-bottom a{
	text-decoration: none;
}
.info-item {
	width: 90px;
	height: 30px;
	display: flex;
	justify-content: space-around;
	align-items: center;
	font-size: 12px;
	font-family: Microsoft YaHei;
	font-weight: 400;
	color: #333333;
	border-radius: 3px;
	cursor: pointer;
	background-color: rgba(0, 0, 0, 0.1) !important;
}
.info-item img {
	width: 14px;
	height: 16px;
}
.user-info-bottom {
	position: relative;
	width: 100%;
	height: 30px;
}
.logout_left {
	line-height: 30px;
	position: absolute;
	top: 0;
	left: 10px;
	font-size: 12px;
	font-family: Microsoft YaHei;
	font-weight: 400;
	color: #93999f;
	cursor: pointer;
}
.logout_right {
	line-height: 30px;
	position: absolute;
	top: 0;
	right: 10px;
	font-size: 12px;
	font-family: Microsoft YaHei;
	font-weight: 400;
	color: #93999f;
	cursor: pointer;
}
.vip{
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 30px;
  margin-left: -105px;
  margin-top: 18px;
  font-size: 12px;
  line-height:30px;
}
.vipImg{
  width: 15px;
  height: 15px;
  margin-right: 12px;
}
.vipImg img{
  width: 100% !important;
  height: 100% !important;
}
.vipName{
  color: #93999F;
}
.endTime{
  padding-left: 2px;
  color:#FF0000 ;
  position: absolute;
  top: 45px;
  left: 73px;
  font-size: 12px;
}

.avator-info-half {
	width: 60px;
	height: 60px;
	font-size: 14px;
	font-family: Microsoft YaHei;
	font-weight: 400;
	color: #333333;
	display: flex;
	flex-direction: column;
}
.avator-info-half p {
	height: 40px;
	line-height: 40px;
	cursor: pointer;
}

</style>

<script>
export default {
  name: 'NavBar'
}
</script>