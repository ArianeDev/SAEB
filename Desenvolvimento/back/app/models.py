from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import RegexValidator
from django.contrib.auth.base_user import BaseUserManager
from django.utils.translation import gettext_lazy as _

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError(_('O email é obrigatório'))
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError(_('Superuser precisa ter is_staff=True.'))
        if extra_fields.get('is_superuser') is not True:
            raise ValueError(_('Superuser precisa ter is_superuser=True.'))

        return self.create_user(email, password, **extra_fields)

# Validators

validate_email = RegexValidator(
    regex=r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$',
    message="Digite o email corretamente, deve conter letras minúsculas, números e ponto antes do @, seguido por um domínio.",
)
validate_phone = RegexValidator(
    regex=r'^\(\d{2}\)\d{5}-\d{4}$',
    message="O número de telefone deve estar no formato: (XX) XXXXX-XXXX",
)
validate_username = RegexValidator(
    regex=r'^[A-Za-z0-9À-ÿ]+(?: [A-Za-z0-9À-ÿ]+)*$',
    message="O nome de usuário pode conter letras, números e espaços, mas não pode começar ou terminar com espaço."
)

# Choices

MONITORING_TYPE_CHOICES = [
    ('view', 'View'),
    ('purchase', 'Purchase'),
]

# Models
    
class Product(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(max_length=1000)
    tension = models.CharField(max_length=100)
    dimensions = models.CharField(max_length=100)
    storage = models.CharField(max_length=100) # ver isso aqui
    resolution = models.CharField(max_length=100)
    conectivity = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Stock(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    min_quantity = models.PositiveIntegerField()
    max_quantity = models.PositiveIntegerField()

    def __str__(self):
        return f"{self.product.name} - {self.quantity} in stock"
    
    def retirar(self, quantity):
        if self.quantity - quantity < self.min_quantity:
            raise ValueError("Quantidade insuficiente em estoque.")
        
        self.quantity -= quantity
        self.save()

        if self.quantity <= self.min_quantity:
            print("Alerta: Estoque abaixo da quantidade mínima!")
    
    def add(self, quantity):
        if self.quantity + quantity > self.max_quantity:
            raise ValueError("Excede a quantidade máxima de estoque.")
        
        self.quantity += quantity
        self.save()

        if self.quantity >= self.max_quantity:
            print("Alerta: Estoque atingiu a quantidade máxima!")

class User(AbstractUser):
    username = None
    name = models.CharField(max_length=150, validators=[validate_username], blank=True, null=True)
    email = models.EmailField(max_length=254, unique=True, validators=[validate_email])
    phone = models.CharField(max_length=15, blank=True, null=True, validators=[validate_phone])
    address = models.TextField(blank=True, null=True)
    date_of_birth = models.DateField(blank=True, null=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
        return self.email

class Monitoring(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    type = models.CharField(max_length=10, choices=MONITORING_TYPE_CHOICES)
    quantity = models.PositiveIntegerField(blank=True, null=True)
    date = models.DateTimeField(max_length=10, blank=True, null=True)

    def __str__(self):
        return f"{self.user.email} viewed {self.product.name} at {self.date}"