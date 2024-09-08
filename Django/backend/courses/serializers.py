from rest_framework import serializers
from .models import UserLMS, Course, Lesson


class UserLMSSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserLMS
        fields = ['id', 'first_name', 'last_name', 'userName', 'email', 'role']
class CourseSerializer(serializers.ModelSerializer):

    class Meta:
        model = Course
        fields = ['id', 'title', 'description', 'thumbnail']
    def create(self, validated_data):
        # Handle thumbnail upload if needed
        thumbnail = validated_data.pop('thumbnail', None)
        course = Course.objects.create(**validated_data)
        if thumbnail:
            course.thumbnail = thumbnail
            course.save()
        return course

    def update(self, instance, validated_data):
        # Handle thumbnail update if needed
        thumbnail = validated_data.pop('thumbnail', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        if thumbnail:
            instance.thumbnail = thumbnail
        instance.save()
        return instance


class LessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lesson
        fields = ['id', 'title', 'content', 'course', 'video_url']

    def create(self, validated_data):
        # Handle any special processing if needed
        return Lesson.objects.create(**validated_data)

    def update(self, instance, validated_data):
        # Handle any special processing if needed
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance

