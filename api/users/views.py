from rest_framework import generics, response, status, views
from rest_framework.authtoken.models import Token
from django.contrib.auth import login as django_login
from . import serializers


class UserRegister(generics.CreateAPIView):
    """
    Register a new `User`.
    An email to validate the new account is sent if `email_verified`
    is set to `False`.
    """
    serializer_class = serializers.RegistrationSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            return self.is_valid(serializer)
        return self.is_invalid(serializer)

    def is_invalid(self, serializer):
        return response.Response(
            data=serializer.errors,
            status=status.HTTP_400_BAD_REQUEST,
        )

    def is_valid(self, serializer):
        user = serializer.save()
        ok_message = 'Your account has been created.'

        return response.Response(
            data={'data': ok_message},
            status=status.HTTP_201_CREATED,
        )


class UserLogin(generics.GenericAPIView):
    serializer_class = serializers.LoginSerializer

    def process_login(self):
        django_login(self.request, self.user)

    def login(self):
        self.user = self.serializer.validated_data['user']
        self.token = Token.objects.get_or_create(user=self.user)
        self.process_login()


    def post(self, request, *args, **kwargs):
        self.request = request
        self.serializer = self.get_serializer(data=self.request.data, context={'request': request})
        self.serializer.is_valid(raise_exception=True)

        self.login()
        
        user_dict = {
            'username': self.user.username,
            'active': self.user.is_active
        }
        return response.Response(user_dict, status=status.HTTP_200_OK)
