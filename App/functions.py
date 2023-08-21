import qrcode
import os
import requests
import json
from cryptography.fernet import Fernet
from typing import Final 

TOKEN:Final ='6068565398:AAHdBhwnlkZmxex2ct5k-h5F-a0bU6BRn_Q'

def qr_code(number):
    img = qrcode.make(number)
    img_file = f"img_qr.png"
    img.save(img_file)
    img_data = open(img_file, 'rb')
    return img_data, img_file


def sendMessage(chat_id, message):
    
    url = f'https://api.telegram.org/bot{TOKEN}/sendMessage'
    response = requests.post(url, json={"chat_id": chat_id, 'text': message})
    return response
    

def sendPhoto(chat_id, new_order_number ):
    qrcode, img_file = qr_code(new_order_number)
    caption = "Please scan to enter"
    url = f'https://api.telegram.org/bot{TOKEN}/sendPhoto?chat_id={chat_id}&caption={caption}'
    response = requests.post(url, files={'photo': qrcode})
    qrcode.close()
    os.remove(img_file)
    return response

KEY:Final = Fernet.generate_key()
XYZ:Final = Fernet(KEY)
def encode_order_number(order_number):
    print(KEY)
    data = str(order_number)
    encrypted_data = XYZ.encrypt(data.encode())
    return encrypted_data

def decode_order_number(data):
    decrypted_data = XYZ.decrypt(data).decode()
    return int(decrypted_data)