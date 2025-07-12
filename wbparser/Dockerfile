FROM python:3.12-slim

RUN groupadd -r wbuser && useradd -r -g wbuser wbuser

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

RUN pip install --upgrade pip

RUN apt-get update && apt-get install -y \
    gcc \
    postgresql-client \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app/www/wbparser

COPY requirements/ ./requirements/
COPY pyproject.toml .

RUN pip install -r requirements/dev.txt
RUN pip install django-cors-headers

COPY . .

RUN mkdir -p /app/www/wbparser/staticfiles
RUN mkdir -p /app/www/wbparser/media

RUN chown -R wbuser:wbuser /app/www/wbparser

USER wbuser

EXPOSE 8000

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]