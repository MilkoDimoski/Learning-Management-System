<template>
  <nav class="navbar">
    <div class="navbar-container">
      <router-link to="/" class="nav-link">HOME</router-link>
      <router-link to="/addUser" class="nav-link">REGISTER</router-link>
      <router-link to="/sign-in" class="nav-link">LOGIN</router-link>
      <button @click="handleSignOut" v-if="isLoggedIn" class="nav-button sign-out-button">Sign out</button>
      <div v-if="userRole" class="user-role">You are logged in as: {{ userRole }}</div>
      <router-link to="/users" class="nav-button users-button">USERS</router-link>
    </div>
  </nav>
  <div class="main-content">
    <router-view/>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const isLoggedIn = ref(false);
const auth = getAuth();
const router = useRouter();
const store = useStore();

const userRole = computed(() => store.getters['user/userRole']);

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    isLoggedIn.value = !!user;
  });
  // fetchUserRole();
});

const handleSignOut = () => {
  signOut(auth).then(() => {
    router.push('/');
  });
};

onMounted(() => {
  store.dispatch('fetchCurrentUser');
});
</script>

<style scoped>
/* Fancy font for the navbar */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap');

.navbar {
  width: 100%;
  background-color: #E9CCCE;
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  font-family: 'Poppins', sans-serif;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.navbar-container {
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 10px 20px;
}

.nav-link {
  color: white;
  margin: 0 15px;
  text-decoration: none;
  font-size: 1.1rem;
  font-weight: 600;
  position: relative;
  padding-bottom: 5px;
  transition: color 0.3s ease, transform 0.3s ease;
  border-radius: 10px;
}

.nav-link::after {
  content: '';
  display: block;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: #ff007f;
  transition: width 0.3s ease;
}

.nav-link:hover {
  color: #ff007f;
  transform: scale(1.05);

}

.nav-link:hover::after {
  width: 100%;
}

.nav-button {
  background-color: transparent;
  border: 2px solid white;
  color: white;
  padding: 5px 15px;
  border-radius: 5px;
  margin-left: 15px;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: 600;
  transition: background-color 0.3s ease, color 0.3s ease, transform 0.3s ease;
}

.nav-button:hover {
  background-color: #ff007f;
  color: white;
  transform: scale(1.05);
}

.sign-out-button {
  background-color: #e53e3e; /* More red color */
  border: 2px solid #e53e3e; /* Match border color with background */
}

.sign-out-button:hover {
  background-color: #c53030; /* Darker red on hover */
  border: 2px solid #c53030; /* Match border color with hover background */
}

.users-button {
  background-color: #4a5568; /* Different color for the USERS button */
  border: 2px solid #4a5568; /* Match border color with background */
}

.users-button:hover {
  background-color: #2d3748; /* Darker color on hover */
  border: 2px solid #2d3748; /* Match border color with hover background */

}

.user-role {
  color: white;
  margin-left: 15px;
  font-size: 0.9rem;
  font-weight: 400;
}
</style>
