# 🛍️ Wildberries Парсер

**Парсер товаров с Wildberries с современным веб-интерфейсом**

[![Docker](https://img.shields.io/badge/Docker-Ready-blue.svg)](https://www.docker.com/)
[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![Django](https://img.shields.io/badge/Django-5.2.4-green.svg)](https://www.djangoproject.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue.svg)](https://www.postgresql.org/)

## 📋 Описание

Wildberries Парсер — это полнофункциональное веб-приложение для анализа товаров с маркетплейса Wildberries. Приложение позволяет:

- 🔍 **Парсить товары** по поисковым запросам
- 📊 **Анализировать данные** через интерактивные диаграммы
- 🎯 **Фильтровать результаты** по цене, рейтингу и отзывам
- 📈 **Визуализировать статистику** распределения цен и скидок

## ✨ Возможности

### 🛒 Таблица товаров
- **Полная информация**: название, цена, скидка, рейтинг, количество отзывов
- **Умная сортировка**: по всем колонкам (возрастание/убывание)
- **Визуальные рейтинги**: звездочки для наглядности
- **Форматирование цен**: в рублях с разделителями

### 🎛️ Фильтры и поиск
- **Поиск по запросу**: введите любой товар (телефон, ноутбук, наушники)
- **Диапазон цен**: слайдер для установки минимальной и максимальной цены
- **Фильтр рейтинга**: минимальный рейтинг с визуализацией звездочек
- **Фильтр отзывов**: минимальное количество отзывов

### 📊 Диаграммы и аналитика
- **Гистограмма цен**: распределение товаров по ценовым диапазонам
- **График скидок**: зависимость размера скидки от рейтинга товара
- **Динамическое обновление**: диаграммы обновляются при изменении фильтров

## 🏗️ Архитектура

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React App     │    │   Django API    │    │   PostgreSQL    │
│   (Frontend)    │◄──►│   (Backend)     │◄──►│   (Database)    │
│   Port: 3000    │    │   Port: 8000    │    │   Port: 5432    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Технологический стек
- **Frontend**: React 18, Chart.js, CSS3
- **Backend**: Django 5.2, Django REST Framework
- **Database**: PostgreSQL 15
- **Containerization**: Docker & Docker Compose

## 🚀 Быстрый старт

### Вариант 1: Docker (Рекомендуется) ⭐

**Запуск одной командой:**

```bash
# 1. Клонируйте репозиторий
git clone https://github.com/KnightCode1024/wb-parser-test-task.git
cd wb-parser-test-task

# 2. Настройте переменные окружения
cp env.template .env

# 3. Запустите все сервисы
docker-compose up --build
```

**Готово!** Приложение доступно по адресам:
- 🌐 **Frontend**: http://localhost:3000
- 🔧 **Backend API**: http://localhost:8000
- 🗄️ **Database**: localhost:5432

### Вариант 2: Локальная установка

#### Backend (Django)

```bash
# 1. Перейдите в папку backend
cd wbparser

# 2. Создайте виртуальное окружение
python -m venv venv

# 3. Активируйте окружение
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

# 4. Установите зависимости
pip install -r requirements/dev.txt
pip install django-cors-headers psycopg2-binary

# 5. Настройте базу данных PostgreSQL
# Создайте базу данных и пользователя

# 6. Выполните миграции
python manage.py migrate

# 7. Запустите сервер
python manage.py runserver
```

#### Frontend (React)

```bash
# 1. Перейдите в папку frontend
cd frontend

# 2. Установите зависимости
npm install

# 3. Запустите приложение
npm start
```

## 📖 Как использовать

### 1. Поиск товаров
1. Откройте http://localhost:3000
2. Введите поисковый запрос (например: "iPhone", "MacBook", "AirPods")
3. Нажмите кнопку "Найти товары"
4. Дождитесь загрузки результатов

### 2. Работа с фильтрами
- **Цена**: используйте слайдеры для установки диапазона цен
- **Рейтинг**: установите минимальный рейтинг (от 1 до 5 звезд)
- **Отзывы**: укажите минимальное количество отзывов
- **Сброс**: нажмите "Сбросить фильтры" для возврата к исходным настройкам

### 3. Анализ данных
- **Таблица**: сортируйте по любой колонке, кликнув на заголовок
- **Гистограмма**: изучайте распределение цен по диапазонам
- **График скидок**: анализируйте зависимость скидок от рейтинга

## 🔧 API Endpoints

### Основные эндпоинты

- `GET /api/products/` - Получение списка товаров
- `GET /api/ping/` - Проверка работоспособности API

### Параметры запроса

```
GET /api/products/?search=телефон&min_price=10000&min_rating=4&min_reviews=100
```

**Параметры:**
- `search` - поисковый запрос (обязательный)
- `min_price` - минимальная цена
- `min_rating` - минимальный рейтинг
- `min_reviews` - минимальное количество отзывов

## 📁 Структура проекта

```
wb-parser-test-task/
├── frontend/              # React приложение
│   ├── src/
│   │   ├── components/    # React компоненты
│   │   ├── App.js         # Главный компонент
│   │   └── index.js       # Точка входа
│   ├── Dockerfile         # Docker образ для frontend
│   └── package.json       # Зависимости Node.js
├── wbparser/              # Django приложение
│   ├── api/               # API приложение
│   │   └── parser/        # Парсер Wildberries
│   ├── wbparser/          # Настройки Django
│   ├── requirements/      # Python зависимости
│   ├── Dockerfile         # Docker образ для backend
│   └── manage.py          # Django CLI
├── docker-compose.yml     # Оркестрация контейнеров
├── env.example            # Пример переменных окружения
└── README.md              # Документация
```

## 🔒 Переменные окружения

Создайте файл `.env` на основе `env.template`:

```env
# Django settings
DJANGO_SECRET_KEY=your-secret-key-here
DJANGO_DEBUG=True

# Database settings
POSTGRES_DB=wbparser
POSTGRES_USER=wbuser
POSTGRES_PASSWORD=wbpass
POSTGRES_HOST=postgres
POSTGRES_PORT=5432
```
