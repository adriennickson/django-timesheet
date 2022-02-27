from typing import Any
from django.conf import settings
import firebase_admin
from firebase_admin import auth, credentials
from django.contrib.auth import login

from django.contrib.auth.models import User
from django.http.request import HttpRequest
from django.http.response import HttpResponse

AUTH_HEADER = "HTTP_AUTHENTICATED_USER"

def get_authenticated_user(request: HttpRequest):
    user = None
    if request.COOKIES.get('firebaseAccessToken'):
    # if request.method == "POST" and 'firebaseAccessToken' in request.POST:
        if not firebase_admin._apps:
            cred = credentials.Certificate( settings.GOOGLE_APPLICATION_CREDENTIALS)
            default_app = firebase_admin.initialize_app(cred)
        # decoded_token = auth.verify_id_token(request.POST['firebaseAccessToken'], app=default_app)
        try:
            decoded_token = auth.verify_id_token(request.COOKIES.get('firebaseAccessToken'))
            user = decoded_token
        except:
            pass
    return user

class FirebaseAuthenticationMiddleware:
    def __init__(self, get_response: Any) -> None:
        self.get_response = get_response

    def __call__(self, request: HttpRequest) -> HttpResponse:

        firebase_user = get_authenticated_user(request)
        print(firebase_user)

        if firebase_user is not None:
            print(firebase_user['email'])
            if User.objects.filter(email=firebase_user['email']).exists():
                user = User.objects.get(email=firebase_user['email'])
            else:
                user = User.objects.create(
                    username=firebase_user['name'],
                    email=firebase_user['email'],
                    password=User.objects.make_random_password(),
                    is_staff=True,
                )

            request.user = user
            login(request, user)

        else:
            print("La fin du monde!")

        response = self.get_response(request)

        return response
