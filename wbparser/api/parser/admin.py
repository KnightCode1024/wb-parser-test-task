from django.contrib import admin
from api.parser.models import Product


@admin.register(Product)
class ProductAmin(admin.ModelAdmin):
    pass
