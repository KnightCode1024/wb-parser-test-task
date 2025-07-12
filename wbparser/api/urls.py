from django.urls import include, path

urlpatterns = [
    path("api/", include("api.parser.urls")),
]
