from django.db import models
from django_enumfield import enum
import uuid
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password
from django.core.validators import MinLengthValidator
from django.contrib.auth.hashers import check_password
# Create your models here.


User = get_user_model()


class ReportType(enum.Enum):
    Order = 1
    Product = 2

class UserType(enum.Enum):
    Admin = 1
    Manager = 2
    Driver = 3


class Status(enum.Enum):
    Pending = 1
    Delivered = 2

class UserStatus(enum.Enum):
    Available = 1
    Unavailable = 2


class Profile(models.Model):
    
    id = models.AutoField(primary_key=True)
    profileimg = models.ImageField(upload_to='profile', default="blank-profile-picture.png" )
    user = models.ForeignKey(User, on_delete = models.CASCADE)
    userType = enum.EnumField(UserType, default=UserType.Driver)
    number = models.IntegerField(default= 2345 )
    userStatus = enum.EnumField(UserStatus, default= UserStatus.Available)
    chat_id = models.IntegerField(default=0)
    def __str__(self):
        return self.user.username

class Order(models.Model):

    id = models.AutoField(primary_key=True)
    number = models.IntegerField()
    name = models.CharField(max_length=50)
    user = models.ForeignKey(Profile, on_delete=models.CASCADE)
    date = models.DateTimeField()
    status = enum.EnumField(Status, default=Status.Pending)
    
    def __str__(self):
        return self.name

class Product(models.Model):

    id = models.AutoField(primary_key=True)
    prod_img = models.ImageField(upload_to='products')
    name = models.CharField(max_length=200)
    brand = models.CharField(max_length=20)
    category = models.CharField(max_length=200)
    count = models.IntegerField()

    def __str__(self):
        return self.name

class Report(models.Model):

    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(Profile, on_delete=models.CASCADE, null=True, blank=True) 
    order = models.ForeignKey(Order, on_delete=models.CASCADE, blank=True, null=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, blank=True, null=True)
    message = models.TextField()
    adminReply = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    reportType = enum.EnumField(ReportType, default = ReportType.Order)
    reply_time = models.DateTimeField(blank=True, null=True)
    
    def __int__(self):
        return self.id
    
class Record(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    user = models.ForeignKey(Profile, on_delete= models.CASCADE)
    order = models.ForeignKey(Order, on_delete= models.CASCADE)
    dateTime = models.DateTimeField()

    def __str__(self):
        return self.user.user.username

class TeleUser(models.Model):
    id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=25, null = False)
    password = models.CharField(max_length = 20, null = False, validators=[MinLengthValidator(8)])
    chat_id = models.IntegerField(default=0)

    def save(self, *args, **kwargs):
        self.password = make_password(self.password)
        super(TeleUser, self).save(*args, **kwargs)

    def check_password(self, entered_password):
        return check_password(entered_password, self.password)

    def __str__(self):
        return self.username

class TeleOrder(models.Model):
    id = models.AutoField(primary_key=True)
    number = models.IntegerField()
    user = models.ForeignKey(TeleUser, on_delete=models.CASCADE)
    date = models.DateTimeField()
    status = enum.EnumField(Status, default=Status.Pending)

    def __int__(self):
        return self.number