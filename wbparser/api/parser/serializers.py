from rest_framework import serializers
from .models import Product


class ProductSerializer(serializers.ModelSerializer):
    discount_percent = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = [
            "product_id",
            "name",
            "price",
            "discounted_price",
            "discount_percent",
            "rating",
            "count_review",
            "search_query",
            "parse_at",
        ]

    def get_discount_percent(self, obj):
        if obj.discounted_price and obj.price:
            return round((1 - obj.discounted_price / obj.price) * 100)
        return 0
