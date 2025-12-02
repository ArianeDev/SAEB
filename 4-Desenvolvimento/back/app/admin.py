from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Product, Monitoring, Stock

class UserAdmin(UserAdmin):
    list_display = ('email', 'phone', 'is_staff', 'is_superuser')
    search_fields = ('email', 'phone')
    ordering = ('email',) 
    fieldsets = (
        (None, {
            'fields': ('email', 'password')
            }
        ),
        ('Informações pessoais', {
            'fields': ('name', 'phone', 'address', 'date_of_birth')
            }
        ),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2', 'is_staff', 'is_superuser'),
        }),
    )

admin.site.register(User, UserAdmin)
admin.site.register(Monitoring)
admin.site.register(Product)
admin.site.register(Stock)