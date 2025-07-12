import datetime

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework.response import Response

from api.parser.models import Product
from api.parser.serializers import ProductSerializer
from api.parser.utils import WildBerriesParser


class ProductSearchView(ListAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        keyword = self.request.query_params.get("search", "").strip()
        if not keyword:
            return Product.objects.none()

        parser = WildBerriesParser()
        if not parser.parse(keyword):
            return Product.objects.none()

        queryset = Product.objects.filter(search_query=keyword)

        min_price = self.request.query_params.get("min_price")
        if min_price:
            queryset = queryset.filter(price__gte=float(min_price))

        min_rating = self.request.query_params.get("min_rating")
        if min_rating:
            queryset = queryset.filter(rating__gte=float(min_rating))

        min_reviews = self.request.query_params.get("min_reviews")
        if min_reviews:
            queryset = queryset.filter(count_review__gte=int(min_reviews))

        return queryset


class PongView(APIView):
    def get(self, request, format=None):
        return Response(
            {"status": "ok", "time": datetime.now().isoformat()},
            status=status.HTTP_200_OK,
        )
