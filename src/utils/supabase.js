import { createClient } from '@supabase/supabase-js';

// Vite 会自动加载 .env 文件中的变量
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

// 测试函数
export const testSupabaseConnection = async () => {
  try {
    const { data, error } = await supabase.from('dayofai_order_user').select('*').limit(1);
    if (error) {
      console.error('Supabase 测试连接失败:', error.message);
      return false;
    }
    console.log('Supabase 测试连接成功:', data);
    return true;
  } catch (err) {
    console.error('测试连接时发生错误:', err);
    return false;
  }
};

export const testCourseCheckAuth = async (xhs_id) => {
  try {
    const { data, error } = await supabase.from('dayofai_order_user').select('xhs_id')
      .eq('xhs_id', xhs_id)
      .single();

    if (error && error.code !== 'PGRST116') { 
      console.error('查询 dayofai_order_user 表失败：', error.message);
      return false;
    }
    // 如果 data 存在，说明找到了对应的 xhs_id
    console.log('说明找到了对应的:', xhs_id, data);
    return !!data;

  } catch (err) {
    console.error('检查课程授权时发生错误：', err);
    return false;
  }
};

export default supabase;
