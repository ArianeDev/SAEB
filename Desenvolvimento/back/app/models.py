from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import RegexValidator

# Validators

validate_username = RegexValidator(
    regex=r'^[A-Za-z0-9À-ÿ]+(?: [A-Za-z0-9À-ÿ]+)*$',
    message="O nome de usuário pode conter letras, números e espaços, mas não pode começar ou terminar com espaço."
)
validate_email = RegexValidator(
    regex=r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$',
    message="Digite o email corretamente, deve conter letras minúsculas, números e ponto antes do @, seguido por um domínio.",
)
validate_phone = RegexValidator(
    regex=r'^\(\d{2}\)\d{5}-\d{4}$',
    message="O número de telefone deve estar no formato: (XX) XXXXX-XXXX",
)

# Models

class User(AbstractUser):
    username = models.CharField(max_length=150, unique=True, blank=True, null=True, validators=[validate_username])
    email = models.EmailField(max_length=254, unique=True, validators=[validate_email])
    phone = models.CharField(max_length=15, blank=True, null=True, validators=[validate_phone])
    address = models.TextField(blank=True, null=True)
    date_of_birth = models.DateField(blank=True, null=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.username
    
class Product(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(max_length=1000)
    tenure = models.CharField(max_length=100)
    dimensions = models.CharField(max_length=100)
    storage = models.CharField(max_length=100) # ver isso aqui
    resolution = models.CharField(max_length=100)
    conectivity = models.CharField(max_length=100)

    def __str__(self):
        return self.name
    
class Estoque(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    min_quantity = models.PositiveIntegerField()
    max_quantity = models.PositiveIntegerField()

    def __str__(self):
        return f"{self.product.name} - {self.quantity} in stock"

class History(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    date = models.DateTimeField(max_length=10, blank=True, null=True)

    def __str__(self):
        return f"{self.user.username} viewed {self.product.name} at {self.date}"