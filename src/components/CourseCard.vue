<template>
  <div 
    class="course-card" 
    :class="{ 'gray-text': isGrayText }" 
    :data-type="type"
  >
    <div class="card-header" @click="toggleDrawer">
      <div class="title-and-meta-group">
        <h3>{{ title }}</h3>
        <div class="meta">
          <span class="level">{{ level }}</span>
          <span class="age-range">{{ ageRange }}</span>
        </div>
      </div>
      <div class="description-row">
        <p class="description">{{ description }}</p>
        <button v-if="courseWareId" class="btn-course-ware-card" @click.stop="$emit('viewCourseWare', courseWareId)">课程资料</button>
      </div>
      <span class="arrow" :class="{ 'is-open': isOpen }">▼</span>
    </div>
    <div class="drawer" :class="{ 'is-open': isOpen }">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CourseCard',
  props: {
    title: { type: String, required: true },
    type: { type: String, required: true },
    level: { type: String, required: true },
    ageRange: { type: String, required: true },
    description: { type: String, required: true },
    class: {
      type: String,
      default: ''
    },
    isGrayText: { type: Boolean, default: false },
    courseWareId: { type: String, default: '' }
  },
  emits: ['viewCourseWare'],
  data() {
    return {
      isOpen: !this.isGrayText
    }
  },
  methods: {
    toggleDrawer() {
      if (!this.isGrayText) {
        this.isOpen = !this.isOpen
      }
    },
    /*startPlay(id) {
      console.log('开始学习课程:', id)
      // 这里可以添加跳转或其他逻辑
    }*/
  }
}
</script>

<style scoped>
.course-card {
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
  cursor: pointer;
  width: 100%;
  display: block;
  color: inherit;
}

.gray-text,
.gray-text h3,
.gray-text .meta,
.gray-text .description,
.gray-text .sub-items,
.gray-text .sub-item {
  color: #b3b2b2 !important;
}

h3 {
  font-size: 1.25rem;
  margin-bottom: 0;
  margin-right: 1rem;
}

.meta {
  margin-bottom: 0;
}

.level, .age-range {
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.2);
  margin-right: 0.5rem;
  font-size: 0.875rem;
}

.description {
  font-size: 0.875rem;
  line-height: 1.5;
  margin-bottom: 1rem;
}

.description-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.description {
  font-size: 0.875rem;
  line-height: 1.5;
  margin-bottom: 0;
  flex-grow: 1;
  padding-right: 10px;
}

.btn-course-ware-card {
  width: 80px;
  height: 30px;
  line-height: 30px;
  border: 0px;
  outline: none;
  color: #fff;
  background: #4CAF50;
  border-radius: 12px;
  cursor: pointer;
  flex-shrink: 0;
}

.btn-course-ware-card:hover {
  background: #2E7D32;
}

.drawer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease-out;
}

.drawer.is-open {
  max-height: 500px;
}

.card-header {
  cursor: pointer;
  position: relative;
  padding-right: 2rem;
  width: 100%;
  display: block;
}

.arrow {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%) rotate(0deg);
  transition: transform 0.3s ease;
}

.arrow.is-open {
  transform: translateY(-50%) rotate(180deg);
}

h3, .meta, .description, .sub-items, .sub-item {
  color: inherit;
}

.btn-learn {
  margin: 5px 5px 0 0;
  float: right;
  right: -100px;
  width: 80px;
  height: 30px;
  line-height: 30px;
  border: 0px;
  outline: none;
  color: #fff;
  background: #388fff;
  border-radius: 12px;
  cursor: pointer;
}

.btn-learn:hover {
  background: #1565C0;
}

.sub-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title-and-meta-group {
  display: flex;
  align-items: baseline;
  margin-bottom: 0.5rem;
}

.course-card.gray-text .card-header {
  cursor: default;
}
</style>