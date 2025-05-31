from django.contrib import admin
from .models.product import Product
from .models.usuario import Usuario

admin.site.register(Product)
admin.site.register(Usuario)


# Register your models here.
