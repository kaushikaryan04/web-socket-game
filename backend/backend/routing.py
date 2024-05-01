from django.urls import path , re_path
from api.consumers import GameConsumer


ws_patterns = [
    path("ws/game/<room_code>" , GameConsumer.as_asgi())
]