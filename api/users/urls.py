from django.conf.urls import url
from django.contrib.auth.views import login
from rest_framework.authtoken import views as rest_framework_views
from . import views


urlpatterns = [
    url(
        regex=r'^register/?$',
        view=views.UserRegister.as_view(),
        name='register',
    ),
    url(r'^login/$', views.UserLogin.as_view(), name='login')
]