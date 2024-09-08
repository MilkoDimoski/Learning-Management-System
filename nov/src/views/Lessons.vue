<!-- Lessons.vue -->
<template>
  <div>
    <h2>Lessons</h2>
    <table>
      <thead>
      <tr>
        <th>Title</th>
        <th>Content</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="lesson in lessons" :key="lesson.id">
        <td>{{ lesson.title }}</td>
        <td>{{ lesson.content }}</td>
        <td>
          <button @click="editLesson(lesson)">Edit</button>
          <button @click="deleteLesson(lesson.id)">Delete</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    courseId: {
      type: Number,
      required: true
    }
  },
  computed: {
    lessons() {
      return this.$store.getters.getLessonsByCourseId(this.courseId);
    }
  },
  methods: {
    editLesson(lesson) {
      this.$router.push({ name: 'EditLesson', params: { id: lesson.id, courseId: this.courseId } });
    },
    deleteLesson(lessonId) {
      if (confirm('Are you sure you want to delete this lesson?')) {
        this.$store.dispatch('removeLesson', { courseId: this.courseId, lessonId });
      }
    }
  },
  created() {
    this.$store.dispatch('fetchLessons', this.courseId);
  }
};
</script>
