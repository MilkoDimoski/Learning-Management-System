from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet,CurrentUserView, CourseViewSet,EnrollUserView, LessonViewSet,EnrolledCoursesList

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'courses', CourseViewSet)
router.register(r'lessons', LessonViewSet)

# You can define lessons nested under courses like this:
lesson_list = LessonViewSet.as_view({
    'get': 'list',
    'post': 'create'
})

lesson_detail = LessonViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'delete': 'destroy'
})

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/users/current/', CurrentUserView.as_view(), name='current-user'),  # Ensure this is the correct endpoint
    path('api/courses/<int:course_id>/lessons/', lesson_list, name='lesson-list'),
    path('api/courses/<int:course_id>/lessons/<int:pk>/', lesson_detail, name='lesson-detail'),
    path('api/lessons/', lesson_list, name='lesson-list'),
    path('api/enrolled_courses/', EnrolledCoursesList.as_view(), name='enrolled_courses_list'),
    path('api/enroll/', EnrollUserView.as_view(), name='enroll-user'),  # Add enrollment endpoint
]

