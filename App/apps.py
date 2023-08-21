from django.apps import AppConfig
from .bot import *
import threading
import os
from .userBot import *
class AppConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'App'
    def ready(self):
        if os.environ.get('RUN_MAIN') == 'true':
            thread1 = threading.Thread(target=teleStart, args=(), daemon=True)
            thread2 = threading.Thread(target=startTeleBot, args=(), daemon=True)
            thread1.start()
            thread2.start()