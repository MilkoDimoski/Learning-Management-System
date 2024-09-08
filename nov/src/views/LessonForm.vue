<!-- LessonForm.vue -->
<template>
  <div>
    <h2>{{ isEdit ? 'Edit Lesson' : 'Add Lesson' }}</h2>
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="title">Title:</label>
        <input v-model="form.title" id="title" type="text" required />
      </div>
      <div>
        <label for="content">Content:</label>
        <textarea v-model="form.content" id="content" required></textarea>
      </div>
      <div>
        <label for="video_url">Video URL:</label>
        <input v-model="form.video_url" id="video_url" type="url" />
      </div>
      <button type="submit">{{ isEdit ? 'Update Lesson' : 'Add Lesson' }}</button>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    courseId: Number,
    lesson: Object
  },
  data() {
    return {
      form: {
        title: this.lesson ? this.lesson.title : '',
        content: this.lesson ? this.lesson.content : '',
        video_url: this.lesson ? this.lesson.video_url : ''
      }
    };
  },
  computed: {
    isEdit() {
      return !!this.lesson;
    }
  },
  methods: {
    async handleSubmit() {
      const lessonData = { ...this.form, courseId: this.courseId };

      if (this.isEdit) {
        lessonData.id = this.lesson.id;
        await this.$store.dispatch('editLesson', { courseId: this.courseId, lessonData });
      } else {
        await this.$store.dispatch('createLesson', { courseId: this.courseId, lessonData });
      }

      this.$router.push(`/course/${this.courseId}`);
    }
  }
};
</script>
