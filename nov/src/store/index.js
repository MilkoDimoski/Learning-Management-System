import {createStore} from 'vuex';
import axios from 'axios';
import lessons from "@/views/Lessons.vue";
import users from "@/views/Users.vue";

const store = createStore({
        state: {
            currentUser: null, // Store the logged-in user
            users: [],
            courses: [],
            lessons: [],
            role: null,
            currentLesson:null,
            enrolledCourses: [],  // Add this to manage enrolled courses
        },
        mutations: {
            SET_ENROLLED_COURSES(state, courses) {
                state.enrolledCourses = courses;
                console.log('Mutated enrolled courses:', state.enrolledCourses); // Debugging line
            },
            setCurrentUser(state, user) {
                state.currentUser = user;
            },
            setUsers(state, users) {
                state.users = users;
            },
            setCourses(state, courses) {
                state.courses = courses;
            },
            // setLessons(state, { courseId, lessons }) {
            //     const course = state.courses.find(course => course.id === courseId);
            //     if (course) {
            //         course.lessons = lessons;
            //     }
            // },
            setLessons(state, lessons) {
                state.lessons = lessons;
            },
            addUser(state, user) {
                state.users.push(user);
            },
            updateUser(state, updatedUser) {
                const index = state.users.findIndex(user => user.id === updatedUser.id);
                if (index !== -1) {
                    state.users[index] = updatedUser;
                }
            },
            deleteUser(state, userId) {
                state.users = state.users.filter(user => user.id !== userId);
            },
            addCourse(state, course) {
                state.courses.push(course);
            },
            updateCourse(state, updatedCourse) {
                const index = state.courses.findIndex(course => course.id === updatedCourse.id);
                if (index !== -1) {
                    state.courses[index] = updatedCourse;
                }
            },
            deleteCourse(state, courseId) {
                state.courses = state.courses.filter(course => course.id !== courseId);
            },
            ADD_LESSON(state, lesson) {
                const course = state.courses.find(course => course.id === lesson.course);
                if (course) {
                    if (!course.lessons) course.lessons = [];
                    course.lessons.push(lesson);
                }
            },
            UPDATE_LESSON(state, updatedLesson) {
                const index = state.lessons.findIndex(lesson => lesson.id === updatedLesson.id);
                if (index !== -1) {
                    state.lessons[index] = updatedLesson;
                }
            },
            DELETE_LESSON(state, lessonId) {
                state.lessons = state.lessons.filter(lesson => lesson.id !== lessonId);
            },
            addLessonToCourse(state, {courseId, lesson}) {
                const course = state.courses.find(course => course.id === courseId);
                if (course) {
                    if (!course.lessons) course.lessons = [];
                    course.lessons.push(lesson);
                }
            },
            updateLessonInCourse(state, {courseId, updatedLesson}) {
                const course = state.courses.find(course => course.id === courseId);
                if (course) {
                    const lessonIndex = course.lessons.findIndex(lesson => lesson.id === updatedLesson.id);
                    if (lessonIndex !== -1) {
                        course.lessons[lessonIndex] = updatedLesson;
                    }
                }
            },
            removeLessonFromCourse(state, {courseId, lessonId}) {
                const course = state.courses.find(course => course.id === courseId);
                if (course) {
                    course.lessons = course.lessons.filter(lesson => lesson.id !== lessonId);
                }
            },
            setUserRole(state, role) {
                state.userRole = role;
            },
            SET_CURRENT_LESSON(state, lesson) {
                state.currentLesson = lesson;
            },
        },
        actions: {
            async setUser({commit}, user) {
                try {
                    commit('setCurrentUser', user);
                } catch (error) {
                    console.error('Failed to set user:', error);
                }
            },
            async fetchUsers({ commit }) {
                try {
                    console.log('Fetching users');
                    const response = await axios.get('http://localhost:8000/api/users/');
                    commit('setUsers', response.data);
                } catch (error) {
                    console.error('Failed to fetch users:', error);
                }
            },
            async fetchCourses({commit}) {
                try {
                    const response = await axios.get('http://localhost:8000/api/courses/');
                    commit('setCourses', response.data);
                } catch (error) {
                    console.error('Failed to fetch courses:', error);
                }
            },
            async fetchLessons({ commit }, courseId) {
                try {
                    const response = await axios.get(`http://localhost:8000/api/lessons`, {
                    });
                    commit('setLessons', response.data);
                } catch (error) {
                    console.error('Error fetching lessons:', error);
                }
            },
            async createUser({commit}, userData) {
                try {
                    console.log(userData,"dsdsd")
                    console.log(userData.type)
                    const response = await axios.post('http://localhost:8000/api/users/', userData, {
                        headers: {
                            'Content-Type': 'application/json;charset=utf-8',
                            'Accept': 'application/json'

                        }
                    });
                    const newUser = response.data;
                    commit('addUser', newUser);
                } catch (error) {
                    console.error('Failed to create user:', error);
                }
            },

            async getUser({commit}, userId) {
                try {
                    const response = await axios.get(`http://localhost:8000/api/users/${userId}/`);
                    return response.data;
                } catch (error) {
                    console.error('Failed to fetch user:', error);
                    throw error;
                }
            },
            async editUser({commit}, {userId, userData}) {
                try {
                    console.log(userId);
                    console.log("Treba edit")
                    console.log(userData);
                    const response = await axios.put(`http://localhost:8000/api/users/${userId}/`, userData, {
                        headers: {
                            'Content-Type': 'application/json;charset=utf-8',
                            'Accept': 'application/json'
                        }
                    });
                    const updatedUser = response.data;
                    commit('updateUser', updatedUser);
                } catch (error) {
                    console.error('Failed to update user:', error);
                }
            },
            async deleteUser({commit}, userId) {
                try {
                    await axios.delete(`http://localhost:8000/api/users/${userId}/`);
                    commit('deleteUser', userId);
                } catch (error) {
                    console.error('Failed to delete user:', error);
                }
            },
            async createCourse({commit}, courseData) {
                console.log(courseData)

                try {
                    const response = await axios.post('http://localhost:8000/api/courses/', courseData)
                    // headers: {
                    //     'Content-Type': 'multipart/form-data',
                    // },
                    // headers: {
                    //     'Content-Type': 'application/json;charset=utf-8',
                    //     'Accept': 'application/json'
                    //
                    // }

                    commit('addCourse', response.data);
                } catch (error) {
                    console.error('Failed to create course:', error);
                }
            },
            async getCourse({commit}, courseId) {
                try {
                    const response = await axios.get(`http://localhost:8000/api/courses/${courseId}/`);
                    return response.data;  // Return the data to be used in the component
                } catch (error) {
                    console.error('Failed to fetch course:', error);
                    throw error;
                }
            },
            async getLesson({ commit }, lessonId) {
                try {
                    const response = await axios.get(`/api/lessons/${lessonId}`);
                    commit('setLessons', response.data);
                } catch (error) {
                    console.error("Error fetching lesson:", error);
                }
            },
            async editCourse({ commit }, courseData) {
                try {
                    console.log(courseData); // Debug: Check the structure of courseData
                    const response = await axios.put(`http://localhost:8000/api/courses/${courseData.id}/`, courseData);
                    commit('updateCourse', response.data);
                } catch (error) {
                    console.error('Failed to edit course:', error.response ? error.response.data : error.message);
                    throw error; // Re-throw to handle in the component if needed
                }
            }
            ,
            async editLesson({ commit }, courseData) {
                try {
                    console.log(courseData); // Debug: Check the structure of courseData
                    const response = await axios.put(`http://localhost:8000/api/courses/${courseData.id}/lessons/`, courseData);
                    commit('updateLessons', response.data);
                } catch (error) {
                    console.error('Failed to edit lesson:', error.response ? error.response.data : error.message);
                    throw error; // Re-throw to handle in the component if needed
                }
            },
            async fetchLessonById({ commit }, lessonId) {
                try {
                    const response = await axios.get(`http://localhost:8000/api/lessons/${lessonId}`);
                    commit('SET_CURRENT_LESSON', response.data);
                    return response.data; // Return the lesson data
                } catch (error) {
                    console.error('Error fetching lesson by ID:', error);
                    throw error;
                }
            },
            async removeCourse({commit}, courseId) {
                try {
                    await axios.delete(`http://localhost:8000/api/courses/${courseId}/`);
                    commit('deleteCourse', courseId);
                } catch (error) {
                    console.error('Failed to delete course:', error);
                }
            },
            async createLesson({ commit }, { courseId, lessonData }) {
                try {
                    const response = await axios.post(`http://localhost:8000/api/courses/${courseId}/lessons/`, lessonData);
                    commit('ADD_LESSON', response.data);

                } catch (error) {

                    console.error('Error creating lesson:', error);
                }
            },
            async updateLesson({ commit }, lessonData) {
                try {
                    const response = await axios.put(`http://localhost:8000/api/lessons/${lessonData.id}/`, lessonData);
                    commit('UPDATE_LESSON', response.data);
                } catch (error) {
                    console.error('Error updating lesson:', error);
                }
            },
            async deleteLesson({ commit }, lessonId) {
                try {
                    await axios.delete(`http://localhost:8000/api/lessons/${lessonId}/`);
                    commit('DELETE_LESSON', lessonId);
                } catch (error) {
                    console.error('Error deleting lesson:', error);
                }
            },
            async fetchCurrentUser({ commit }) {
                try {
                    const token = localStorage.getItem('token');
                    if (!token) {
                        throw new Error('No token found');
                    }

                    // Set the token in headers
                    const response = await axios.get('/api/current-user/', {
                        headers: { Authorization: `Bearer ${token}` }
                    });

                    // Check if the response is in the correct format
                    if (response.data && typeof response.data === 'object') {
                        commit('SET_CURRENT_USER', response.data);
                        console.log('Fetched current user:', response.data); // Debugging output
                    } else {
                        console.error('Unexpected response format:', response);
                    }

                } catch (error) {
                    console.error('Error fetching current user:', error.message || error);
                }
            },
            async loginUser({ commit }, userData) {
                try {
                    const response = await axios.post('http://localhost:8000/api/auth/login/', userData);

                    // Validate response and token
                    if (response.data && response.data.token) {
                        const token = response.data.token;
                        localStorage.setItem('token', token); // Store the token securely
                        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`; // Set the token for future requests

                        // Commit the user data to the state
                        commit('setCurrentUser', response.data.user);

                        // If user role is part of the response, store it as well
                        if (response.data.user && response.data.user.role) {
                            commit('setUserRole', response.data.user.role);
                        }

                    } else {
                        console.error('Login response is missing required data');
                    }
                } catch (error) {
                    console.error('Failed to login:', error.response ? error.response.data : error.message);
                    throw new Error('Failed to login, please check your credentials.');
                }
            }
            ,
            async enrollInCourse({ commit, state }, course) {
                // Ensure enrolledCourses is initialized
                if (!Array.isArray(state.enrolledCourses)) {
                    console.error('state.enrolledCourses is not an array');
                    return;
                }
                // Logic to enroll in course
                try {
                    await axios.post('http://localhost:8000/api/enroll/', { courseId: course.id }); // Assuming an endpoint for enrolling
                    commit('SET_ENROLLED_COURSES', [...state.enrolledCourses, course]); // Example mutation
                } catch (error) {
                    console.error('Error enrolling in course:', error);
                }
            },
            async fetchEnrolledCourses({ commit }) {
                try {
                    const response = await axios.get('http://localhost:8000/api/enrolled_courses/');
                    console.log('Fetched enrolled courses:', response.data);
                    commit('SET_ENROLLED_COURSES', response.data);
                } catch (error) {
                    console.error('Error fetching enrolled courses:', error);
                }
            }

            ,


        },
        getters: {
            lessons: (state) => state.lessons,
            getLessonById: (state) => (id) => state.currentLesson.find(lesson => lesson.id === id),
            currentLesson: (state) => state.currentLesson,
            enrolledCourses: (state) => state.enrolledCourses,
            isAuthenticated(state) {
                return !!state.currentUser;
            }
            ,
            getUserbyEmail(state, useremail) {
                console.log(useremail)
                return state.users.find(user => user.email === useremail);
            }
            ,
            currentUser(state) {
                return state.users.find(user => user.email === state.currentUser.email);
            }
            ,
            getCourses(state) {
                return state.courses;
            }
            ,
            getCoursesByUserId: (state) => (userId) => {
                const user = state.users.find(user => user.id === userId);
                if (!user) return [];
                return state.courses.filter(course => user.courseIds.includes(course.id));
            },
            getCourseById:
                (state) => (id) => {
                    return state.courses.find(course => course.id === id);
                },
            getLessonsByCourseId:
                (state) => (courseId) => {
                    console.log("Getter is filtering lessons by courseId:", courseId);
                    return state.lessons.filter((lesson) => lesson.course === parseInt(courseId));
                },
            userRole:
                state => state.role,
        }
    })
;

export default store;
