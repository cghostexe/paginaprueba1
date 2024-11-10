from django.urls import path
from .views import index, login, register, compra, logout

urlpatterns = [
    path('', index, name='index'),
    path('login/', login, name='login'),
    path('register/', register, name='register'),
    path('compra/', compra, name='compra'),
    path('logout/', logout, name='logout'),
]