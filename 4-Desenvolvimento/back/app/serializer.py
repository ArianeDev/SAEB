from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import Product, User, Stock, Monitoring

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'name', 'email', 'password')
        read_only_fields = ['id']
        extra_kwargs = {
            'password': {'write_only': True}
        }
    
    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'tension', 'dimensions', 'storage', 'resolution', 'conectivity']

class StockSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source='product.name', read_only=True)
    status_message = serializers.SerializerMethodField()

    class Meta:
        model = Stock 
        fields = ['id', 'max_quantity', 'min_quantity', 'product', 'product_name', 'quantity', 'status_message']

    def get_status_message(self, obj):
        if obj.quantity <= obj.min_quantity:
            return f"Estoque de {obj.product.name} abaixo do mínimo!"
        elif obj.quantity >= obj.max_quantity:
            return f"Estoque de {obj.product.name} acima do máximo!"
        return None

class MonitoringSerializer(serializers.ModelSerializer):
    user_email = serializers.CharField(source='user.email', read_only=True)
    product_name = serializers.CharField(source='product.name', read_only=True)

    class Meta:
        model = Monitoring
        fields = ['id', 'user', 'product', 'user_email', 'product_name', 'type', 'quantity', 'date']
      

class LoginSerializer(TokenObtainPairSerializer):
    username_field = 'email'

    def validate(self, attrs):
        credentials = {
            'email': attrs.get('email'),
            'password': attrs.get('password')
        }

        self.user = authenticate(**credentials)

        if self.user is None:
            raise serializers.ValidationError("Email ou senha inválidos.")
        
        data = super().validate(attrs)
        data['user'] = UserSerializer(self.user).data

        return data