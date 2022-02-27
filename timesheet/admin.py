from django.contrib import admin
from timesheet.models import Daily, Task, Commit

class DailyAdmin(admin.ModelAdmin):
    list_display = ('id', 'creation_date', 'day', 'user', 'comment')

admin.site.register(Daily, DailyAdmin)


class TaskAdmin(admin.ModelAdmin):
    list_display = ('id', 'daily', 'comment', 'number_of_hours', 'project')

admin.site.register(Task, TaskAdmin)


class CommitAdmin(admin.ModelAdmin):
    list_display = ('id', 'task', 'commit')

admin.site.register(Commit, CommitAdmin)