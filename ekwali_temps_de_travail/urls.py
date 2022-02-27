"""ekwali_temps_de_travail URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path
from django.contrib.auth import views as auth_views
from firebase_auth import views as firebase_auth_view

urlpatterns = [
    path('accounts/firebase-login/', firebase_auth_view.firebaseAuth, name='firebase-login'),
    path('accounts/login/', auth_views.LoginView.as_view(template_name='timesheet/login.html'), name='login'),
    path('logout/', auth_views.LogoutView.as_view(next_page='timesheet_index'), name='logout'),
    path('timesheet/', include('timesheet.urls')),
    path('', include('dmz.urls')),
    path('admin/', admin.site.urls),
]
