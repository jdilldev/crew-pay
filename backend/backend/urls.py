from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from stack import views

router = routers.DefaultRouter()
router.register(r'users', views.UserView, 'user')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('',views.login_or_create_user, name='login_or_create_user')
]
