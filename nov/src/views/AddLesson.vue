<template>
  <div class="container">
    <h1 class="form-title">Add Lesson</h1>
    <form @submit.prevent="addLesson" class="lesson-form">
      <div class="form-group">
        <label for="title" class="form-label">Title:</label>
        <input v-model="lesson.title" id="title" type="text" class="form-input" required />
      </div>
      <div class="form-group">
        <label for="content" class="form-label">Content:</label>
        <textarea v-model="lesson.content" id="content" class="form-input" required></textarea>
      </div>
      <button type="submit" class="action-button submit-button">Add Lesson</button>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'AddLesson',
  data() {
    return {
      lesson: {
        title: '',
        content: ''
      }
    };
  },
  computed: {
    courseId() {
      return this.$route.params.courseId; // Update to use courseId
    }
  },
  methods: {
    ...mapActions(['createLesson']),
    async addLesson() {
      if (this.lesson.title && this.lesson.content) {
        try {
          await this.createLesson({courseId: this.courseId, lessonData: this.lesson});
          await this.$router.push(`/courses/${this.courseId}/lessons`); // Redirect to the course lessons page
        } catch (error) {
          console.error('Failed to add lesson:', error);
        }
      }
    }
  }
}
</script>

<style scoped>
/* General Form Styles */
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
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

.action-button {
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  color: #fff;
  background: linear-gradient(90deg, #c33f80, #c64574);
  transition: background-color 0.3s ease, transform 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
}

.action-button:hover {
  background: linear-gradient(90deg, #bd2b4f, #951230);
  transform: scale(1.05);
}

/* Responsive Design */
@media (max-width: 768px) {
  .lesson-form {
    width: 90%;
  }

  .action-button {
    font-size: 14px;
    padding: 8px 16px;
  }
}

@media (max-width: 576px) {
  .form-title {
    font-size: 1.8rem;
  }

  .form-label {
    font-size: 1rem;
  }
}
</style>
