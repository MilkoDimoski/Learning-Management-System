from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets, status
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserLMSSerializer  # Import a serializer to format the data
from .models import UserLMS, Course, Lesson
from .serializers import UserLMSSerializer, CourseSerializer, LessonSerializer
from rest_framework import viewsets, status
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.response import Response
from .models import Lesson, Course
from .serializers import LessonSerializer
class UserViewSet(viewsets.ModelViewSet):
    queryset = UserLMS.objects.all()
    serializer_class = UserLMSSerializer
    parser_classes = [MultiPartParser, FormParser, JSONParser]

    def create(self, request, *args, **kwargs):
        print("Form Data:")

        # Check if request.data is a dict-like object
        print("Request Headers:", request.headers)
        print("Request Data:", request.data)
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, *args, **kwargs):
        # Custom update logic (optional)
        print("Update Request Headers:", request.headers)
        print("Update Request Data:", request.data)

        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)

        if serializer.is_valid():
            self.perform_update(serializer)
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

from rest_framework import status, viewsets
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.response import Response
from .models import Course
from .serializers import CourseSerializer
import json

# views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User

class CurrentUserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        if user.is_authenticated:
            return Response({
                'id': user.id,
                'username': user.username,
                'email': user.email,
                # Include any other fields you need
            })
        return Response({'detail': 'Not found.'}, status=404)

class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    parser_classes = [MultiPartParser, FormParser, JSONParser]

    def create(self, request, *args, **kwargs):
        data = request.data.copy()
        if 'teachers' in data:
            teachers_ids = data.getlist('teachers')[0].split(',')
            data['teachers'] = [int(id) for id in teachers_ids if id.isdigit()]

        if 'students' in data:
            students_ids = data.getlist('students')[0].split(',')
            data['students'] = [int(id) for id in students_ids if id.isdigit()]

        serializer = self.get_serializer(data=data)
        if serializer.is_valid():
            course = serializer.save()
            if 'teachers' in data:
                course.teachers.set(data['teachers'])
            if 'students' in data:
                course.students.set(data['students'])
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, *args, **kwargs):
        try:
            return super().update(request, *args, **kwargs)
        except ValidationError as e:
            return Response({'detail': str(e)}, status=400)

class LessonViewSet(viewsets.ModelViewSet):
    queryset = Lesson.objects.all()
    serializer_class = LessonSerializer
    parser_classes = [MultiPartParser, FormParser, JSONParser]

    def create(self, request, *args, **kwargs):
        course_id = self.kwargs.get('course_id')
        print("Received course_id:", course_id)
        print("Request data:", request.data)
        try:
            course = Course.objects.get(pk=course_id)
        except Course.DoesNotExist:
            return Response({'detail': 'Course not found.'}, status=status.HTTP_400_BAD_REQUEST)

        data = request.data.copy()
        data['course'] = course.id
        serializer = self.get_serializer(data=data)
        if serializer.is_valid():
            lesson = serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def perform_create(self, serializer):
        course_id = self.kwargs.get('course_id')
        course = Course.objects.get(pk=course_id)
        serializer.save(course=course)

    def perform_destroy(self, instance):
        print(f"Deleting lesson: {instance.id}")
        instance.delete()
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class EnrolledCoursesList(APIView):
    def get(self, request, format=None):
        user = request.user
        enrolled_courses = Enrollment.objects.filter(user=user)
        courses = [enrollment.course for enrollment in enrolled_courses]
        serializer = CourseSerializer(courses, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

from rest_framework import status, views
from rest_framework.response import Response
from .models import Enrollment, UserLMS, Course


class EnrollUserView(views.APIView):
    def post(self, request, format=None):
        user_id = request.data.get('user_id')
        course_id = request.data.get('course_id')
        try:
            user = UserLMS.objects.get(pk=user_id)
            course = Course.objects.get(pk=course_id)
        except (UserLMS.DoesNotExist, Course.DoesNotExist):
            return Response({'detail': 'User or Course not found.'}, status=status.HTTP_400_BAD_REQUEST)

        # Create or update enrollment
        enrollment, created = Enrollment.objects.get_or_create(user=user, course=course)
        if created:
            return Response({'detail': 'Enrolled successfully.'}, status=status.HTTP_201_CREATED)
        return Response({'detail': 'Already enrolled.'}, status=status.HTTP_200_OK)

