<template>
  <div class="container">
    <h2 class="form-title">Edit Lesson</h2>
    <form @submit.prevent="updateLesson" class="lesson-form">
      <div class="form-group">
        <label for="title" class="form-label">Title:</label>
        <input v-model="lesson.title" type="text" id="title" class="form-input" required />
      </div>

      <div class="form-group">
        <label for="content" class="form-label">Content:</label>
        <textarea v-model="lesson.content" id="content" class="form-input" required></textarea>
      </div>

      <div class="button-group">
        <button type="submit" class="action-button submit-button">Save Changes</button>
        <button type="button" @click="cancelEdit" class="action-button cancel-button">Cancel</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';

const store = useStore();
const route = useRoute();
const router = useRouter();
const lesson = ref({ title: '', content: '' });

onMounted(async () => {
  const lessonId = route.params.id;
  try {
    const lessonData = await store.dispatch('fetchLessonById', lessonId);
    lesson.value = lessonData || { title: '', content: '' };
  } catch (error) {
    console.error('Error fetching lesson data:', error);
  }
});

const updateLesson = async () => {
  try {
    await store.dispatch('updateLesson', lesson.value);
    const courseId = route.params.courseId;
    if (courseId) {
      router.push({name: 'CourseLessons', params: {id: courseId}});
    } else {
      console.error('Course ID is missing');
    }
  } catch (error) {
    console.error('Error updating lesson:', error);
  }
};

const cancelEdit = () => {
  const courseId = route.params.courseId;
  if (courseId) {
    router.push({name: 'CourseLessons', params: {id: courseId}});
  } else {
    console.error('Course ID is missing');
  }
};
</script>

<style scoped>
/* Container and form styles */
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #f3f4f6, #e2e2e2);
}

.form-title {
  font-size: 2rem;
  color: #2d3748;
  margin-bottom: 20px;
  text-align: center;
}

.lesson-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 500px;
  background: #fff;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-label {
  font-size: 1.2rem;
  color: #4a5568;
}

.form-input {
  padding: 12px 15px;
  border: 1px solid #cbd5e0;
  border-radius: 8px;
  font-size: 1rem;
  width: 100%;
  box-sizing: border-box;
  transition: border-color 0.3s ease;
}

.form-input:focus {
  border-color: #c33f80;
  outline: none;
}

/* Button group and action buttons */
.button-group {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.action-button {
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  color: #fff;
  transition: background-color 0.3s ease, transform 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
}

.submit-button {
  background: linear-gradient(90deg, #c33f80, #c64574);
}

.submit-button:hover {
  background: linear-gradient(90deg, #bd2b4f, #951230);
  transform: scale(1.05);
}

.cancel-button {
  background: #718096;
}

.cancel-button:hover {
  background: #4a5568;
  transform: scale(1.05);
}

/* Responsive design */
@media (max-width: 768px) {
  .lesson-form {
    width: 90%;
  }

  .action-button {
    font-size: 14px;
    padding: 8px 16px;
  }
}
</style>
