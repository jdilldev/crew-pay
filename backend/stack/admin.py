from django.contrib import admin

# Register your models here.

from .models import User


class StackAdmin(admin.ModelAdmin):
    list_display = ('name', 'iso_2', 'address', 'phone', 'email')

# Register your models here.


admin.site.register(User, StackAdmin)
