from django.db import models


class Product(models.Model):
    search_query = models.CharField(
        max_length=255,
        verbose_name="Поисковый запрос",
    )
    name = models.CharField(
        max_length=255,
        blank=False,
        verbose_name="Название товара",
    )
    price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        blank=False,
        verbose_name="Цена",
    )
    discounted_price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        null=True,
        blank=True,
        verbose_name="Цена со скидкой",
    )
    rating = models.FloatField(
        verbose_name="Рейтинг",
    )
    count_review = models.PositiveIntegerField(
        verbose_name="Количество отзывов",
    )
    parse_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name="Дата парсинга",
    )
    product_id = models.BigIntegerField(
        verbose_name="ID товара на WB",
        unique=True,
    )

    class Meta:
        indexes = [
            models.Index(fields=["search_query"]),
            models.Index(fields=["price"]),
            models.Index(fields=["rating"]),
            models.Index(fields=["count_review"]),
        ]
        ordering = ["-parse_at"]

    def __str__(self):
        return self.name
