from django.shortcuts import render, redirect
from django.contrib.auth import logout as auth_logout
from django.contrib.auth.decorators import login_required


def index(request):
    return render(request, 'web/index.html')


@login_required(login_url='/')
def profile(request):
    return render(request, 'web/profile.html')


@login_required(login_url='/')
def logout(request):
    auth_logout(request)
    return redirect('index')
