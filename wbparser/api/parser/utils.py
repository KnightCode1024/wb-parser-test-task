import requests
from django.utils import timezone
from django.db import transaction
from api.parser.models import Product


class WildBerriesParser:
    def parse(self, keyword: str) -> bool:
        try:
            url = (
                "https://search.wb.ru/exactmatch/ru/common/v13/"
                "search?ab_testing=false&appType=1&curr=rub&"
                "dest=-1257786&hide_dtype=13&lang=ru&page=1"
                f"&query={keyword}&resultset=catalog&sort=popular"
                "&spp=30&suppressSpellcheck=false"
            )
            response = requests.get(url, timeout=10)
            response.raise_for_status()
            data = response.json()

            products = data.get("data", {}).get("products", [])
            if not products:
                print(
                    f"API вернуло пустой список товаров по запросу '{keyword}'"
                )
                return False

            with transaction.atomic():
                for product in products:
                    try:
                        self._save_product(product, keyword)
                    except Exception as e:
                        print(
                            "Ошибка сохранения товара"
                            f"{product.get('id')}: {e}"
                        )
                        continue

            print(f"Успешно сохранено {len(products)} товаров")
            return True

        except Exception as e:
            print(f"Критическая ошибка парсинга: {e}")
            return False

    def _save_product(self, product: dict, keyword: str):
        """Простое сохранение товара без лишних проверок"""
        price_data = product.get("sizes", [{}])[0].get("price", {})

        Product.objects.update_or_create(
            product_id=product["id"],
            defaults={
                "name": product.get("name", ""),
                "price": float(price_data.get("product", 0)) / 100,
                "discounted_price": float(price_data.get("total", 0)) / 100,
                "rating": product.get("reviewRating", 0),
                "count_review": product.get("feedbacks", 0),
                "search_query": keyword,
                "parse_at": timezone.now(),
            },
        )
