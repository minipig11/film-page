<template>
  <div class="contact-container">
    <h2>用户授权管理</h2>
    <table>
      <thead>
        <tr>
          <th>用户 ID</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.xhs_id">
          <td>{{ user.xhs_id }}</td>
          <td>
            <button
              v-if="user.isAuthorized"
              class="authorized"
              @click="revokeAuthorization(user.xhs_id)"
            >
              已授权
            </button>
            <button
              v-else
              @click="authorizeUser(user.xhs_id)"
              class="authorize"
            >
              授权
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import supabase from '../utils/supabase';

const users = ref([]);

// 获取 xhs_user 表的全部记录，并检查授权状态
const fetchUsers = async () => {
  try {
    const { data: userData, error: userError } = await supabase.from('xhs_user').select('*');
    if (userError) {
      console.error('获取用户列表失败:', userError.message);
      return;
    }

    const { data: authorizedData, error: authorizedError } = await supabase.from('dayofai_order_user').select('xhs_id');
    if (authorizedError) {
      console.error('获取授权状态失败:', authorizedError.message);
      return;
    }

    // 标记用户是否已授权
    const authorizedIds = authorizedData.map((item) => item.xhs_id);
    users.value = userData.map((user) => ({
      ...user,
      isAuthorized: authorizedIds.includes(user.xhs_id),
    }));
  } catch (err) {
    console.error('获取用户列表时发生错误:', err);
  }
};

// 授权用户
const authorizeUser = async (xhs_id) => {
  try {
    const { data, error } = await supabase
      .from('dayofai_order_user')
      .insert([{ xhs_id }]);

    if (error) {
      console.error('授权失败:', error.message);
      alert('授权失败，请重试！');
      return;
    }

    alert(`用户 ${xhs_id} 授权成功！`);
    console.log('授权成功:', data);

    // 更新用户状态
    const user = users.value.find((u) => u.xhs_id === xhs_id);
    if (user) {
      user.isAuthorized = true;
    }
  } catch (err) {
    console.error('授权时发生错误:', err);
  }
};

// 解除授权
const revokeAuthorization = async (xhs_id) => {
  try {
    const { error } = await supabase
      .from('dayofai_order_user')
      .delete()
      .eq('xhs_id', xhs_id);

    if (error) {
      console.error('解除授权失败:', error.message);
      alert('解除授权失败，请重试！');
      return;
    }

    alert(`用户 ${xhs_id} 的授权已解除！`);

    // 更新用户状态
    const user = users.value.find((u) => u.xhs_id === xhs_id);
    if (user) {
      user.isAuthorized = false;
    }
  } catch (err) {
    console.error('解除授权时发生错误:', err);
  }
};

// 页面加载时获取用户列表
onMounted(() => {
  fetchUsers();
});
</script>

<style scoped>
.contact-container {
  padding: 20px;
  font-family: Arial, sans-serif;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f4f4f4;
}

button {
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.authorize {
  background-color: #007bff;
  color: white;
}

.authorize:hover {
  background-color: #0056b3;
}

.authorized {
  background-color: #d4edda;
  color: #155724;
}
</style>