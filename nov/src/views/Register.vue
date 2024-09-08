<script setup>
import {ref} from "vue";
import {getAuth,createUserWithEmailAndPassword,
GoogleAuthProvider,signInWithPopup} from "firebase/auth";
import {useRouter} from 'vue-router'
const email = ref("");
const password = ref("");
const router = useRouter();
const register = () =>{
createUserWithEmailAndPassword(getAuth(),email.value,password.value)
    .then((data) =>{
      console.log("Successfully registered");
      store.dispatch('setUser',email.value)
      const user = store.getters.currentUser
      if (user.role === 'teacher') {
        router.push('/teacher');
      } else if (user.role === 'student') {
        router.push('/student');
      } else {
        router.push('/feed');  // Fallback route
      }
    }).catch((error)=>
{
  console.log(error.code);
  alert(error.message);
})
};
const signInWithGoogle = () =>{
const provider = new GoogleAuthProvider();
signInWithPopup(getAuth(),provider)
    .then((result) => {
      console.log(result.user);
      router.push('/feed');
  })
    .catch((error) => {

    })
};
</script>

<template>
  <h1>Create an Account</h1>
  <p><input type="text" placeholder="Email" v-model="email"></p>
  <p><input type="password" placeholder="Password" v-model="password"></p>
  <p><button @click="register">Submit</button></p>
  <p><button @click="signInWithGoogle">Sign in With Google</button></p>
</template>

<style scoped>

</style>