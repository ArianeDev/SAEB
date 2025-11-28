from django.shortcuts import render

from rest_framework.generics import ListCreateAPIView
from rest_framework.pagination import PageNumberPagination
from back.app.serializer import ProductSerializer, UserSerializer, HistorySerializer, EstoqueSerializer
from .models import User, Product, History, Estoque

# User methods

class User_GET_POST(ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

# Pagination class

class Paginated(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100

# Estoque methods

class Estoque_GET_POST(ListCreateAPIView):
    queryset = Estoque.objects.all()
    serializer_class = EstoqueSerializer
    pagination_class = Paginated

# History methods

class History_GET_POST(ListCreateAPIView):
    queryset = History.objects.all()
    serializer_class = UserSerializer
    pagination_class = Paginated

class History_GET_PUT_PATCH_DELETE(ListCreateAPIView):
    queryset = History.objects.all()
    serializer_class = UserSerializer

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
