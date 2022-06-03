from django.shortcuts import render
from rest_framework import viewsets
from .serializers import UserSerializer
from .models import User
import requests
from stytch import Client as Stytch_Client
import os
from django.http import JsonResponse

print(os.environ['STYTCH_SECRET'])

# Create your views here.
stytch_client = Stytch_Client(
    project_id=os.environ['STYTCH_PROJECT_ID'],
    secret=os.environ['STYTCH_SECRET'],
    environment="test",
)


class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()


def login_or_create_user(request):
    resp = stytch_client.otps.sms.login_or_create('+10000000000').json()
    print(resp)
    return JsonResponse(resp)

    # save phone_id response and use that as method_id to authenticate


def authenticate_sms_code(code: str, method_id: str):
    resp = stytch_client.otps.authenticate(
        method_id,
        code
    ).json()
    print(resp)
