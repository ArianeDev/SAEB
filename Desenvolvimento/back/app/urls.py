from django.urls import path
from .views import (
    Login, GetUser, User_GET_POST,
    Product_GET_POST, Product_GET_PUT_PATCH_DELETE,
    Stock_GET_POST, Stock_GET_PUT_PATCH_DELETE,
    Monitoring_GET_POST, Monitoring_GET_PUT_PATCH_DELETE,
)

urlpatterns = [
    path('login/', Login.as_view(), name='login'),
    path('user/', GetUser, name='get_user'),
    path('users/', User_GET_POST.as_view(), name='user_get_post'),
    path('products/', Product_GET_POST.as_view(), name='product_get_post'),
    path('products/<int:pk>/', Product_GET_PUT_PATCH_DELETE.as_view(), name='product_get_put_patch_delete'),
    path('stocks/', Stock_GET_POST.as_view(), name='stock_get_post'),
    path('stocks/<int:pk>/', Stock_GET_PUT_PATCH_DELETE.as_view(), name='stock_get_put_patch_delete'),
    path('monitorings/', Monitoring_GET_POST.as_view(), name='monitoring_get_post'),
    path('monitorings/<int:pk>/', Monitoring_GET_PUT_PATCH_DELETE.as_view(), name='monitoring_get_put_patch_delete'),
]