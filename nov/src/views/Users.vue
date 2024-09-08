<template>
  <div class="container">
    <h2 class="title">Users</h2>
    <table class="users-table">
      <thead>
      <tr>
        <th>Username</th>
        <th>Email</th>
        <th>Role</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Bio</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="user in users" :key="user.id">
        <td>{{ user.userName }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.role }}</td>
        <td>{{ user.first_name }}</td>
        <td>{{ user.last_name }}</td>
        <td>{{ user.bio }}</td>
        <td>
          <button @click="editUser(user)" class="action-button edit-button">Edit</button>
          <button @click="deleteUser(user.id)" class="action-button delete-button">Delete</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  computed: {
    users() {
      return this.$store.state.users;
    }
  },
  methods: {
    editUser(user) {
      this.$router.push({ name: 'UserEditForm', params: { id: user.id } });
    },
    deleteUser(userId) {
      if (confirm('Are you sure you want to delete this user?')) {
        this.$store.dispatch('deleteUser', userId);
      }
    }
  },
  created() {
    this.$store.dispatch('fetchUsers');
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap');

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: 'Poppins', sans-serif;
}

/* Container Styles */
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  padding: 20px;
  margin-top: 400px;
  background: linear-gradient(135deg, #f7f8fa, #ececec);
}

/* Title Styles */
.title {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 30px;
  text-align: center;
  font-weight: 600;
  letter-spacing: 1.5px;
}

/* Table Styles */
.users-table {
  width: 100%;
  max-width: 900px;
  border-collapse: collapse;
  margin: 20px 0;
  background: #fff;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  overflow: hidden;
}

.users-table th, .users-table td {
  padding: 16px;
  text-align: left;
  font-size: 1rem;
  color: #555;
}

.users-table th {
  background-color: #f0f4f8;
  font-weight: 600;
  color: #333;
}

.users-table td {
  border-bottom: 1px solid #e2e8f0;
  color: #666;
}

.users-table tr:hover {
  background-color: #f9fafc;
}

/* Button Styles */
.action-button {
  padding: 8px 16px;
  font-size: 14px;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  color: #fff;
  margin-top: 10px;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.edit-button {
  background: linear-gradient(90deg, #c33f80, #c64574);
}

.edit-button:hover {
  background: linear-gradient(90deg, #33bfa6, #048e85);
  transform: scale(1.05);
}

.delete-button {
  background: linear-gradient(90deg, #c33f80, #c64574);
}

.delete-button:hover {
  background: linear-gradient(90deg, #b12f47, #981b1b);
  transform: scale(1.05);
}

/* Responsive Design */
@media (max-width: 768px) {
  .users-table {
    width: 100%;
  }

  .action-button {
    font-size: 12px;
    padding: 6px 12px;
  }
}
</style>
