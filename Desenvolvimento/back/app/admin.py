from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Product, History

class UserAdmin(UserAdmin):
    fieldsets = UserAdmin.fieldsets + (
        (None, {
            'fields': ('phone', 'address', 'date_of_birth')
        }),
    )
    add_fieldsets = UserAdmin.add_fieldsets + (
        (None, {
            'fields': ('phone', 'address', 'date_of_birth')
        })
    )

admin.site.register(User, UserAdmin)
admin.site.register(Product)
admin.site.register(History)