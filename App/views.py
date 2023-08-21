from django.views import View
from django.http import HttpResponse, JsonResponse
from .models import *
from django.shortcuts import render, redirect
from django.contrib.auth.models import User, auth
from django.contrib.auth import authenticate, login
from django.contrib import messages
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from django.db.models.functions import Lower
from django.shortcuts import get_object_or_404
from django.db.models import Q
from django.utils import timezone
from .functions import *
from ast import literal_eval
import requests
import random
import qrcode
import json
import time
import os
# Create your views here.

class signin(View):
    template_name = 'signin.html'

    def get(self, request):
        return render(request, self.template_name)

    def post(self, request):
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            user_profile = Profile.objects.get(user=user)
            userType = str(user_profile.userType)
            request.session['userType'] = userType
            if userType == 'Admin':
                return redirect('admin')
            elif userType == 'Manager':
                return redirect('manager')
            
        else:
            messages.info(request, 'Credentials Invalid')
            return render(request, self.template_name)

@method_decorator(login_required(login_url='signin'), name='dispatch')
class Admin(View):
    def get(self, request):
        user_object = User.objects.get(username=request.user.username)
        user_profile = Profile.objects.get(user=user_object)
        report_list = Report.objects.all()
        drivers_list = Profile.objects.exclude(userType = UserType.Admin)
        order_by = request.GET.get('order_by', 'default')
        products_list = Product.objects.all()
        orders_list = Order.objects.all()
        latest_reports = report_list.reverse()[:3]
        if order_by == 'employee_name':
            id_list = []
            drivers_list = []
            user_list = Profile.objects.select_related('user').order_by(Lower('user__username'))
            for user in user_list:
                if user.userType != UserType.Admin:
                    id_list.append(user.id)
            for id in id_list:
                driver = Profile.objects.get(id=id)
                drivers_list.append(driver)
        elif order_by == 'order_name':
            orders_list = Order.objects.order_by('name')

        elif order_by == 'date':
            date = request.GET.get('input_value')
            x = Order.objects.all()
            orders_list = []
            for i in x:
                if str(i.date.date()) == date:
                    orders_list.append(i)
                
        elif order_by == 'order_status':
            orders_list = Order.objects.order_by(Lower('status'))
        elif order_by == 'employee_status':
            drivers_list = Profile.objects.exclude(userType = UserType.Admin).order_by(Lower('userStatus'))
        elif order_by == 'brand':
            products_list = Product.objects.order_by(Lower('brand'))
        elif order_by == 'category':
            products_list = Product.objects.order_by(Lower('category'))
        elif order_by == 'availability':
            products_list = Product.objects.exclude(count = 0)
        elif order_by == 'employee_type':
            drivers_list = Profile.objects.exclude(userType = UserType.Admin).order_by(Lower('userType'))

        context = {
        'drivers_list': drivers_list,
        'user_profile':user_profile,
        'user_profile' : user_profile,
        'report_list': report_list,
        'products_list': products_list,
        'orders_list' : orders_list,
        'latest_reports': latest_reports,
        'unavailable' : UserStatus.Unavailable,
        'available' : UserStatus.Available,
        'pending' : Status.Pending,
        }
        return render(request, 'admin.html', context )

@method_decorator(login_required(login_url='signin'), name='dispatch')
class Manager(View):
    def get(self, request):
        user_object = User.objects.get(username=request.user.username)
        user_profile = Profile.objects.get(user=user_object)
        order_by = request.GET.get('order_by', 'default')
        drivers_list = Profile.objects.filter(userType = UserType.Driver)
        orders_list = Order.objects.all()
        products_list = Product.objects.all()
        orders = Order.objects.all().order_by('id')
        revers_list = orders.reverse()
        recent_orders = revers_list[:3]
        reports_with_reply= Report.objects.exclude(Q(adminReply__isnull=True) | Q(adminReply=''))
        recent_report = reports_with_reply.reverse()[:3]
    
        
        if order_by == 'employee_name':
            id_list = []
            drivers_list = []
            user_list = Profile.objects.select_related('user').order_by(Lower('user__username'))
            for user in user_list:
                if user.userType == UserType.Driver:
                    id_list.append(user.id)
            for id in id_list:
                driver = Profile.objects.get(id=id)
                drivers_list.append(driver)
        elif order_by == 'order_name':
            orders_list = Order.objects.order_by('name')

        elif order_by == 'date':
            date = request.GET.get('input_value')
            
            x = Order.objects.all()
            orders_list = []
            for i in x:
                if str(i.date.date()) == date:
                    orders_list.append(i)
        elif order_by == 'order_status':
            orders_list = Order.objects.order_by(Lower('status'))
        elif order_by == 'employee_status':
            drivers_list = Profile.objects.filter(userType = UserType.Driver).order_by(Lower('userStatus'))
        elif order_by == 'brand':
            products_list = Product.objects.order_by(Lower('brand'))
        elif order_by == 'category':
            products_list = Product.objects.order_by(Lower('category'))
        elif order_by == 'availability':
            products_list = Product.objects.exclude(count = 0)
            


        context = {
        'drivers_list': drivers_list,
        'orders_list' : orders_list,
        'products_list': products_list,
        'user_profile': user_profile,
        'recent_orders': recent_orders,
        'recent_report': recent_report,
        'order': ReportType.Order,
        'product': ReportType.Product,
        'unavailable' : UserStatus.Unavailable,
        'available' : UserStatus.Available,
        'pending' : Status.Pending,
        "reports_with_reply" : reports_with_reply,
        }
        return render(request, 'manager.html', context)

@method_decorator(login_required(login_url='signin'), name='dispatch')
class AddProduct(View):
    template_name = 'manager.html'
    def get(self, request):
        return render(request, template_name)
    def post(self, request):
        if request.FILES.get('image') != None :
            image = request.FILES.get('image')
            name = request.POST['name']
            brand = request.POST['brand']
            category = request.POST['category']
            count = request.POST['count']
            all_products = Product.objects.all()
            product_name_list = []
            for product in all_products:
                product_name_list.append(product.name)
            i = 0
            existing_prod_name = ""
            while i < len(product_name_list):
                if product_name_list[i] == name:
                    existing_prod_name = product_name_list[i]
                    break
                i += 1

            if existing_prod_name != "":
                product = Product.objects.get(name=existing_prod_name)
                
                product.count = product.count + int(count)
                product.save(update_fields=["count"])
            else:
                product = Product.objects.create(prod_img = image, brand = brand, category = category, count = count, name = name)
                product.save()
            return redirect('manager')

@method_decorator(login_required(login_url='signin'), name='dispatch')
class logout(View):
    def get(self, request):
        auth.logout(request)
        return redirect('signin')

@method_decorator(csrf_exempt, name='dispatch')
def EditProduct(request, product_id):

    product = get_object_or_404(Product, id=product_id)
    if request.method == "POST":
    
        name = request.POST.get('name')
        brand = request.POST.get('brand')
        category = request.POST.get('category')
        count = request.POST.get('count')

        product.name = name
        product.brand = brand
        product.category = category
        product.count = count
        product.save(update_fields=["name", "brand", "category", "count"])
    
        return redirect("manager")
        
    else:
        return JsonResponse({
            'name': product.name,
            'brand': product.brand,
            'category': product.category,
            'count' : product.count
        })

@method_decorator(login_required(login_url='signin'), name='dispatch')
class AddReport(View):
    template_name = 'manager.html'
    def get(self, request):
        return render(request, template_name)
    def post(self, request):
        user = Profile.objects.get(user = request.user)
        product_id = request.POST.get('product_id')
        order_id = request.POST.get('order_id')
        message = request.POST.get('report-message')
        if product_id :
            product = Product.objects.get(id=product_id)
            report = Report.objects.create(user = user, product= product, message=message, reportType = ReportType.Product)
            report.save()
        elif order_id :
            order = Order.objects.get(id=order_id)
            report = Report.objects.create(user = user, order = order, message=message, reportType = ReportType.Order)
            report.save()
        return redirect('manager')

@method_decorator(login_required(login_url='signin'), name='dispatch')
class ReportReply(View):
    template_name = 'admin.html'
    def get(self, request):
        return render(request, template_name)
    def post(self, request):
        report_id = request.POST.get('report_id')
        reply_message = request.POST.get('reply-message')
        time = timezone.now()
        report = Report.objects.get(id= report_id)
        report.adminReply = reply_message
        report.reply_time = time
        print(report.adminReply)
        report.save(update_fields=['adminReply', 'reply_time'])
        return redirect('admin')

@method_decorator(login_required(login_url='signin'), name='dispatch')
class AddEmployee(View):
    template_name = 'admin.html'
    def get(self, request):
        return render(request, template_name)
    def post(self, request):
        name =  request.POST.get('name')
        email = request.POST.get('email')
        params = {}
        if request.FILES.get('image') != None :
            params['profileimg'] = request.FILES.get('image')   
        
        if request.POST.get('type') == 'manager' :
            params['userType'] = UserType.Manager
        else:
            params['userType'] =  UserType.Driver
        if User.objects.filter(email=email).exists():
            messages.info(request, "Email Taken")
            return redirect('admin')
        elif User.objects.filter(username = name).exists():
            messages.info(request, "Username Taken")
            return redirect('admin')
        else:
            params['user'] = User.objects.create(username=name, email=email)
            Profile.objects.create(**params)
            return redirect('admin')

@method_decorator(login_required(login_url='signin'), name='dispatch')
class DeleteEmployee(View):
    template_name = 'admin.html'
    def get(self, request):
        return render(request, template_name)
    def post(self, request):
        employee_id = request.POST.get('employee-id')
        employee = Profile.objects.get(id=employee_id)
        employee.delete()
        return redirect('admin')

@method_decorator(csrf_exempt, name='dispatch')
def EditEmployee(request, user_id):
    
    profile = get_object_or_404(Profile, id=user_id)
    user = profile.user
    if request.method == "POST":
    
    
        username = request.POST.get('username')
        email = request.POST.get('email')
        user_type = request.POST.get('user_type')

        if user_type == "Manager":
            t = UserType.Manager
        else:
            t = UserType.Driver
        
        user.username = username
        user.email = email
        user.save(update_fields=["username", "email"])
        profile.user = user
        profile.userType = t
        profile.save(update_fields=['user', 'userType'])
        return redirect("admin")
        
    else:
        return JsonResponse({
            'username': user.username,
            'email': user.email,
            'user_type': profile.userType
    })

@method_decorator(login_required(login_url='signin'), name='dispatch')
class AddOrder(View):
    template_name = 'manager.html'
    def get(self, request):
        return render(request, template_name) 
    def post(self, request):
        name = request.POST['order-name']
        date = request.POST['date-time']
        number = random.randint(1,500)
        drivers = Profile.objects.filter(userType = UserType.Driver, userStatus = UserStatus.Available).exclude(chat_id = 0)
        
        driver = drivers[random.randrange(len(drivers))]
        new_order = Order.objects.create(name= name, date= date, user = driver, number=number)
        new_order.save()
        
        chat_id = driver.chat_id
        date = new_order.date.replace("T"," ")
        # sending new order to user
        message = f'You recieved a new order! Please be here in { date } '
        response = sendMessage(chat_id, message)
        time.sleep(2)
        # sending an attention message
        message = "You'll be recieving an entry QRcode in a second!"
        response = sendMessage(chat_id, message)
        time.sleep(2)
        # sending qr code for order to user
        new_order_number = new_order.number
        encrypted_number = encode_order_number(new_order_number)
        response = sendPhoto(chat_id, encrypted_number)

        driver.userStatus = UserStatus.Unavailable
        driver.save(update_fields=["userStatus"])
        
        return redirect('manager')

@csrf_exempt
def GetChatId(request):
    raw_data = request.body
    data = literal_eval(raw_data.decode('utf-8'))
    print(data)
    chat_id = data['chat_id']
    username = data['username']
    current_user = User.objects.get(username=username)
    current_profile = Profile.objects.get(user = current_user)
    current_profile.chat_id = chat_id
    current_profile.save(update_fields=["chat_id"])
    return JsonResponse({"message": "Success"})

@method_decorator(csrf_exempt, name='dispatch')
class Scan(View):
    template_name = 'scan-code.html'
    def get(self, request):
        return render(request, 'scan-code.html') 

    def post(self,request):
        data = request.POST.get('order_num', False)
        data_to_decrypt = str(data)
        orderNumber = decode_order_number(data_to_decrypt)
        order = Order.objects.get(number = orderNumber)
        if order.status == Status.Pending:
            order.status = Status.Delivered
            order.save(update_fields=["status"])
            user = order.user
            chat_id = order.user.chat_id
            text = f'Welcome {user.user.username}! you can enter...' 
            response = sendMessage(chat_id, text)
            dateTime = timezone.now()
            new_record = Record.objects.create(user=user, order=order, dateTime= dateTime)
            new_record.save()
            return HttpResponse(text)
        else:
            return HttpResponse("this QrCode is invalid!")

class DeleteOrder(View):
    template_name = 'manager.html'
    def get(self, request):
        return render(request, template_name)
    def post(self, request):
        order_id = request.POST.get('order_id')
        order = Order.objects.get(id=order_id)
        order.delete()
        return redirect('manager')

@csrf_exempt
def TeleUserSignUp(request):
    raw_data = request.body
    data = literal_eval(raw_data.decode('utf-8'))
    chat_id = data['chat_id']
    username = data['username']
    password = data['password']
    if TeleUser.objects.filter(chat_id = chat_id).exists():
        return JsonResponse({"message": "You already have an account!" })
    elif TeleUser.objects.filter(username = username).exists(): 
        
        return JsonResponse({"message": "Username already exists!"})
    else:
        TeleUser.objects.create(username = username, password = password, chat_id = chat_id)
        return JsonResponse({"message": "Your account has been created successfully!"})
        
@csrf_exempt
def TeleUserSignIn(request):
    raw_data = request.body
    data = literal_eval(raw_data.decode('utf-8'))
    username = data['username']
    password = data['password']
    if TeleUser.objects.filter(username = username).exists():
        user = TeleUser.objects.get(username = username)
        if user.check_password(password):
            message = f'Welcome {username}!'
            return JsonResponse({"message": message})
        else:
            return JsonResponse({"message": "Invalid Password."})
    else:        
        return JsonResponse({"message": "Invalid Username."})
    
