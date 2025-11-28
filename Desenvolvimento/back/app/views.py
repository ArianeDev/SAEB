from django.shortcuts import render

from rest_framework.decorators import api_view
from rest_framework.generics import ListCreateAPIView
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from .models import User, Product, Stock, Monitoring
from .serializer import ProductSerializer, UserSerializer, LoginSerializer, MonitoringSerializer, StockSerializer

# Login method

@api_view(['GET'])
def GetUser(request):
    serializer = UserSerializer(request.user)
    return Response(serializer.data)

class Login(TokenObtainPairView):
    serializer_class = LoginSerializer

# Pagination class

class Paginated(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100

# User methods

class User_GET_POST(ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

# Stock methods

class Stock_GET_POST(ListCreateAPIView):
    queryset = Stock.objects.all()
    serializer_class = StockSerializer
    pagination_class = Paginated

class Stock_GET_PUT_PATCH_DELETE(ListCreateAPIView):
    queryset = Stock.objects.all()
    serializer_class = StockSerializer

# Monitoring methods

class Monitoring_GET_POST(ListCreateAPIView):
    queryset = Monitoring.objects.all()
    serializer_class = MonitoringSerializer
    pagination_class = Paginated

class Monitoring_GET_PUT_PATCH_DELETE(ListCreateAPIView):
    queryset = Monitoring.objects.all()
    serializer_class = MonitoringSerializer

# Product methods

class Product_GET_POST(ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    pagination_class = Paginated

    def get_queryset(self):
        queryset = super().get_queryset()
        name = self.request.query_params.get('name')

        if name:
            queryset = queryset.filter(name=name)

        return queryset

class Product_GET_PUT_PATCH_DELETE(ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer