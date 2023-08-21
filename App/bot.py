from django.core.management.base import BaseCommand
import telebot
import qrcode
from telebot import types
import os
import requests
from datetime import datetime
import json

def teleStart():


    TOKEN ='6068565398:AAHdBhwnlkZmxex2ct5k-h5F-a0bU6BRn_Q'
    bot = telebot.TeleBot(TOKEN)


    @bot.message_handler(commands=['start'])
    def start_command(message): 
        bot.send_message(message.chat.id, 
                                "Welcome! Please enter your name")
        
        @bot.message_handler(func=lambda message: message.content_type == 'text')
        def handle(message):
            chat_id = message.chat.id
            username = message.text
            headers = {
                    'Content-Type': 'application/json',
                    'Authorization': f'Bearer {TOKEN}',
                }
            data = {
                'chat_id': chat_id, 
                'username':username
                }
            try:
                response = requests.post('http://127.0.0.1:8000/GetChatId', json = data)
                print(response.json())
            except:
                bot.send_message(message.chat.id, 'Error')


    bot.infinity_polling()