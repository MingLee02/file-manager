from rest_framework import serializers
from rest_framework.authtoken.models import Token
from rest_framework.validators import UniqueValidator
from django.contrib.auth.models import User
from django.contrib.auth import authenticate


class RegistrationSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True, validators=[UniqueValidator(queryset=User.objects.all())])
    username = serializers.CharField(validators=[UniqueValidator(queryset=User.objects.all())])
    password = serializers.CharField()
    password2 = serializers.CharField(
        label= 'Repeat password',
    )

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = self.Meta.model.objects.create(**validated_data)
        user.set_password(password)
        user.save()
        return user

    def validate(self, attrs):
        password2 = attrs.pop('password2')
        if password2 != attrs.get('password'):
            msg = 'Your passwords do not match.'
            raise serializers.ValidationError({'password2': msg})
        return attrs

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password', 'password2')


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, attrs):
        username = attrs.get('username')
        password = attrs.get('password')
        user = authenticate(username=username, password=password)
        attrs['user'] = user
        return attrs

    class Meta:
        model = User
        fields = ('id', 'username', 'password')

