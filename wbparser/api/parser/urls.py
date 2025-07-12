from django.urls import path

from api.parser import views


urlpatterns = [
    path("ping/", views.PongView.as_view()),
    path("products/", views.ProductSearchView.as_view(), name="product-list"),
]
