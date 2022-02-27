from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.urls import path
from django.conf import settings


from . import views

urlpatterns = [
    path('', views.index, name='dmz_index'),
]

if settings.DEBUG:
    urlpatterns += staticfiles_urlpatterns()