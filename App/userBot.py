from typing import Final
from django.core.management.base import BaseCommand
import telebot
import qrcode
from telebot import types
import os
import requests
from datetime import datetime
import json

def startTeleBot():
 
    TOKEN:Final = "6688032026:AAG9OjgFOZyRMWvjgELEwlxtN9voVK05q50"
    bot = telebot.TeleBot(TOKEN)

    @bot.message_handler(commands=['start'])
    def handle_start(message):
        # Create a custom keyboard with options
        keyboard = types.ReplyKeyboardMarkup(row_width=1, resize_keyboard=True)
        button_account = types.KeyboardButton(text="1_ I have an account")
        button_create = types.KeyboardButton(text="2_ Create account")
        keyboard.add(button_account, button_create)
        bot.send_message(message.chat.id, "Welcome! Do you have an account or want to create one?", reply_markup=keyboard)

    @bot.message_handler(func=lambda message: True)
    def handle_response(message):
        if message.text == "1_ I have an account":
            # Ask for username and password
            bot.send_message(message.chat.id, "Please enter your username:")
            bot.register_next_step_handler(message, ask_for_password)
        elif message.text == "2_ Create account":
            # Ask for username and password
            bot.send_message(message.chat.id, "Please choose a username:")
            bot.register_next_step_handler(message, ask_password)


    def ask_for_password(message):
        username = message.text
        bot.send_message(message.chat.id, "Please enter your password:")
        bot.register_next_step_handler(message, check_credentials, username)
    
    def check_credentials(message, username):
        password = message.text
        headers = {
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {TOKEN}',
            }
        data = { 
            'username':username,
            'password':password
            }
        try:
            response = requests.post('http://127.0.0.1:8000/TeleUserSignIn',headers = headers, json = data)
            res = response.json()
            bot.send_message(message.chat.id, res['message'])
        except:
            bot.send_message(message.chat.id, 'Error! Please try again... ')
    def ask_password(message):
        username = message.text
        bot.send_message(message.chat.id, "Please enter your password:")
        bot.register_next_step_handler(message, save_credentials, username)

    def save_credentials(message, username):
        # Store the password
        password = message.text
        chat_id = message.chat.id
        headers = {
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {TOKEN}',
            }
        data = {
            'chat_id': chat_id, 
            'username':username,
            'password':password
            }
        try:
            response = requests.post('http://127.0.0.1:8000/TeleUserSignUp', json = data)
            if response.status_code == 200:
                res = response.json()
                bot.send_message(message.chat.id, res['message'] )
        except:
            bot.send_message(message.chat.id, 'Error! Please try again... ')

        # Reply with a confirmation message
        

    # Start the bot
    bot.polling()