from django.shortcuts import render, redirect 
from django.contrib.auth import login as auth_login, logout as auth_logout, authenticate
from django.contrib import messages
from .forms import UserRegistrationForm
from .forms1 import CustomLoginForm

def index(request):
    return render(request, "index.html")

def login(request):
    if request.method == 'POST':
        form = CustomLoginForm(request, data=request.POST)
        if form.is_valid():
            user = form.get_user()
            auth_login(request, user)
            next_url = request.GET.get('next', 'index')  # Obtener la URL 'next' o redirigir a 'index' si no está presente
            return redirect(next_url)
    else:
        form = CustomLoginForm()
    return render(request, 'login.html', {'form': form})

def register(request):
    if request.method == 'POST':
        form = UserRegistrationForm(request.POST)
        if form.is_valid():
            user = form.save()
            auth_login(request, user)
            return redirect('index')
        else:
            messages.error(request, 'Por favor, corrige los errores.')
    else:
        form = UserRegistrationForm()
    return render(request, "register.html", {'form': form})

def compra(request):
    return render(request, "compra.html")

def logout(request):
    auth_logout(request)
    return redirect('index')
