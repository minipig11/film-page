<template>
	<div class="login-container">
		<div class="login-box">
			<h2>请输入您获得的卡号:</h2>
			<div class="input-group">
				<input type="text" placeholder="卡号" v-model="xhsId" />
				<button @click="login">登录</button>
			</div>
			<!--h6>(第一次登录自动注册)</h6-->
			<p class="register-link">
				如何获取卡号? <a href="#" @click.prevent="register">Register now</a>
			</p>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../store/user';
import supabase from '../utils/supabase';
import { getOrderUrl } from  '../utils/ossServer';

const xhsId = ref('');
const router = useRouter();
const userStore = useUserStore();
const orderUrl = ref(''); // 将 orderUrl 定义为 ref

onBeforeMount(async () => {
  orderUrl.value = await getOrderUrl();
});

const login = async () => {
	if (xhsId.value) {
		// 先查询用户是否已存在
		const { data: existingUser, error: queryError } = await supabase
			.from('xhs_user')
			.select('xhs_id')
			.eq('xhs_id', xhsId.value)
			.single();

		if (queryError && queryError.code !== 'PGRST116') { // PGRST116表示未找到记录
			console.error('查询用户失败:', queryError);
			alert('登录失败：查询用户信息时出错');
			return;
		}

		// 如果用户已存在，直接登录
		if (existingUser) {
			userStore.setToken(xhsId.value);
			userStore.setUserInfo({ xhsId: xhsId.value, id: xhsId.value });
			alert('登录成功！');
			router.push('/');
			return;
		} else {
			alert('登录失败：查询无此卡号信息！');
		}
		
		/*const { data, error } = await supabase
			.from('xhs_user')
			.insert([{ xhs_id: xhsId.value }])
			.select();

		if (error) {
			console.error('写入 Supabase 失败：', error.message);
			alert('登录失败：无法写入账号信息。');
			return;
		}
		console.log('账号写入 Supabase 成功：', data);

		userStore.setToken(xhsId.value);
		userStore.setUserInfo({ xhsId: xhsId.value, id: xhsId.value });
		alert('登录成功！');
		router.push('/');
		*/
	} else {
		alert('请输入卡号！');
	}
};


const goHome = () => {
	router.push('/');
};

const register = () => {
	router.push('/order-required');
};
</script>

<style scoped>
.page-container {
  display: flex; /* 使用 flex 布局 */
  align-items: flex-start; /* 垂直方向顶部对齐 */
  min-height: 100vh; /* 页面高度占满视口 */
  padding: 20px;
  box-sizing: border-box;
  gap: 20px; /* 添加子容器之间的间距 */
}

.login-container {
	display: flex;
	justify-content: center;
	align-items: center;
	min-height: 100vh;
	background-color: #f0f2f5;
	font-family: Arial, sans-serif;
}

.login-box {
	background-color: #fff;
	padding: 40px;
	border-radius: 8px;
	box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
	text-align: left;
	width: 100%;
	max-width: 420px;
	font-size: 1.2rem;
}

h2 {
	font-size: 1.2rem;
	color: #333;
	margin-bottom: 25px;
	line-height: 1.5;
}

.input-group {
	display: flex;
	margin-bottom: 20px;
}

input[type="xhsId"] {
	flex-grow: 1;
	padding: 10px 15px;
	border: 1px solid #ccc;
	border-radius: 4px 0 0 4px;
	font-size: 1rem;
	outline: none;
}

input[type="xhsId"]:focus {
	border-color: #007bff;
	box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

button {
	padding: 10px 20px;
	background-color: #e0e0e0;
	color: #333;
	border: 1px solid #ccc;
	border-left: none;
	border-radius: 0 4px 4px 0;
	font-size: 1rem;
	cursor: pointer;
	transition: background-color 0.2s, color 0.2s, border-color 0.2s;
}

button:hover {
	background-color: #d0d0d0;
	color: #000;
	border-color: #b0b0b0;
}

.register-link {
	font-size: 0.9rem;
	color: #555;
	margin-top: 20px;
}

.register-link a {
	color: #007bff;
	text-decoration: none;
	font-weight: bold;
}

.register-link a:hover {
	text-decoration: underline;
}



</style>