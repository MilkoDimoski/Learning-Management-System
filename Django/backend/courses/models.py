from django.db import models

# Create your models here.
from django.db import models



class UserLMS(models.Model):
    ROLE_CHOICES = (
        ('student', 'Student'),
        ('teacher', 'Teacher'),
        ('admin', 'Admin'),
    )

    # Additional fields
    first_name = models.CharField(max_length=25)
    last_name = models.CharField(max_length=25)
    userName = models.CharField(max_length=25,unique=True)
    email = models.EmailField(unique=True)
    role = models.CharField(max_length=10, choices=ROLE_CHOICES)

    bio = models.TextField(max_length=500, blank=True)
    date_of_birth = models.DateField(null=True, blank=True)
    phone_number = models.CharField(max_length=15, blank=True)






    def __str__(self):
        return f"{self.userName} ({self.role})"
class Course(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    teachers = models.ManyToManyField(UserLMS, related_name='courses')
    students = models.ManyToManyField(UserLMS, related_name='enrolled_courses', blank=True)
    thumbnail = models.ImageField(upload_to='course_thumbnails/', null=True, blank=True)
    # created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class Lesson(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='lessons')
    video_url = models.URLField(null=True, blank=True)



    def __str__(self):
        return f"{self.title} - {self.course.title}"

class Enrollment(models.Model):
    user = models.ForeignKey(UserLMS, on_delete=models.CASCADE, related_name='enrollments')
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='enrollments')
    enrolled_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'course')
        verbose_name = 'Enrollment'
        verbose_name_plural = 'Enrollments'

    def __str__(self):
        return f"{self.user} enrolled in {self.course}"
from django.db import models

# Create your models here.
