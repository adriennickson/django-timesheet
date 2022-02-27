from django.contrib import admin

from project.models import Project

# Register your models here.
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'description')

admin.site.register(Project, ProjectAdmin)