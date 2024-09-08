import { createRouter, createWebHistory } from 'vue-router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import CourseDetails from '@/views/CourseDetails.vue';
import AddLesson from '@/views/AddLesson.vue';
import CourseEditForm from '@/views/CourseEditForm.vue';
import UserEditForm from '@/views/UserEditForm.vue';
import UserAddForm from '@/views/UserAddForm.vue';
import CourseList from "@/views/CourseList.vue";
import CourseLessons from "@/views/CourseLessons.vue";
import LessonEditForm from "@/views/LessonEditForm.vue";
import EnrolledCourses from '@/views/EnrolledCourses.vue'; // Ensure this path is correct

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: () => import('@/views/Home.vue') },//done
        { path: '/register', component: () => import('@/views/Register.vue') },//done
        { path: '/sign-in', component: () => import('@/views/SignIn.vue') },//done
        { path: '/contact', component: () => import('@/views/ContactUs.vue') },//done
        { path: '/teacher', component: () => import('@/views/Teacher-Panel.vue') },
        { path: '/student', component: () => import('@/views/StudentPanel.vue') },
        { path: '/users', component: () => import('@/views/Users.vue'),name:'Users' },//done
        { path: '/addCourse', component: () => import('@/views/CourseAddForm.vue'),name:'CourseAddForm' },
        { path: '/editCourse/:id', component: CourseEditForm, name: 'CourseEditForm' },//done
        { path: '/editLesson/:id', component: LessonEditForm, name: 'LessonEditForm' },//done
        { path: '/addUser', component: UserAddForm },//done
        { path: '/editUser/:id', component: UserEditForm, name: 'UserEditForm' },//done
        { path: '/course/:id', component: CourseDetails, name: 'CourseDetails' },//done
        { path: '/feed', component: () => import('@/views/Feed.vue'), meta: { requiresAuth: true } },//done
        { path: '/course/:courseId/lessons/add', component: AddLesson, name: 'AddLesson' },//done
        { path: '/courses/:id/lessons', name: 'CourseLessons', component: CourseLessons },//done
        { path: '/allCourses', component: CourseList, name: 'CourseList' },//done
        { path: '/enrolledCourses', component: EnrolledCourses, name: 'EnrolledCourses' },
    ]
});

const getCurrentuser = () =>{
    return new Promise((resolve, reject) => {
        const removeListener = onAuthStateChanged(getAuth(), (user) => {
            removeListener();
            resolve(user);
        }, reject);
    });
};

// Navigation guard to check for authentication
router.beforeEach(async (to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        try {
            const user = await getCurrentuser();
            if (user) {
                // User is authenticated
                next();
            } else {
                alert("You don't have access!");
                next("/sign-in");
            }
        } catch (error) {
            console.error('Error checking authentication:', error);
            alert("Error checking authentication.");
            next("/sign-in");
        }
    } else {
        next();
    }
});
export default router;