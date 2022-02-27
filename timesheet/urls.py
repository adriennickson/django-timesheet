from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.urls import path
from django.conf import settings


from . import views

urlpatterns = [
    path('', views.index, name='timesheet_index'),
    path('list/', views.list, name='timesheet_list'),
    path('<int:id>/', views.show, name='timesheet_show'),
    path('<int:id>/edit/', views.edit, name='timesheet_edit'),
    path('add/', views.edit, name='timesheet_create'),
]

if settings.DEBUG:
    urlpatterns += staticfiles_urlpatterns()