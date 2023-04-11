# api/views.py

from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.http import JsonResponse
from .serializers import MyTokenObtainPairSerializer, RegisterSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics
from .models import User
from rest_framework.permissions import AllowAny, IsAuthenticated

# Create your views here.

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer


@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token/',
        '/api/register/',
        '/api/token/refresh/'
    ]
    return Response(routes)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def filterEndPoint(request):
    if request.method == 'GET':
        data = {
            'caloriesMin': request.user.caloriesMin,
            'caloriesMax': request.user.caloriesMax,
            'vegan': request.user.vegan,
            'alcoholFree': request.user.alcoholFree,
            'dairyFree': request.user.dairyFree,
        }
        return Response({'response': data}, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        filters = request.data.get('filters')
        request.user.caloriesMin = filters['caloriesMin']
        request.user.caloriesMax = filters['caloriesMax']
        request.user.vegan = filters['vegan']
        request.user.alcoholFree = filters['alcoholFree']
        request.user.dairyFree = filters['dairyFree']
        request.user.save()
        return Response({'response': "Successful!"}, status=status.HTTP_200_OK)
    return Response({}, status.HTTP_400_BAD_REQUEST)