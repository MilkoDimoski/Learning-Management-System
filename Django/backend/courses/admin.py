from django.contrib import admin

# Register your models here.
from django.contrib import admin

from .models import Course, UserLMS, Lesson, Enrollment

admin.site.register(Course)
admin.site.register(UserLMS)
admin.site.register(Lesson)
admin.site.register(Enrollment)
# Register your models here.
