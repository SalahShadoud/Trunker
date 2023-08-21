from django.contrib import admin
from .models import *
# Register your models here.
admin.site.register(Profile)
admin.site.register(Order)
admin.site.register(Product)
admin.site.register(Report)
admin.site.register(Record)
admin.site.register(TeleUser)
admin.site.register(TeleOrder)