from django.urls import path
from . import views

urlpatterns = [
path("", views.signin.as_view(), name= "signin"),
path("admin-board", views.Admin.as_view(), name= "admin"),
path("manager", views.Manager.as_view(), name= "manager"),
path('logout', views.logout.as_view(), name="logout"),
path('AddProduct', views.AddProduct.as_view(), name="AddProduct"),
path('EditProduct/<int:product_id>', views.EditProduct, name="EditProduct"),
path('AddReport', views.AddReport.as_view(), name="AddReport"),
path('ReportReply', views.ReportReply.as_view(), name="ReportReply"),
path('AddEmployee', views.AddEmployee.as_view(), name="AddEmployee"),
path('DeleteEmployee', views.DeleteEmployee.as_view(), name="DeleteEmployee"),
path('EditEmployee/<int:user_id>', views.EditEmployee, name="EditEmployee"),
path('AddOrder', views.AddOrder.as_view(), name="AddOrder"),
path('GetChatId', views.GetChatId, name="GetChatId"),
path('scan_code', views.Scan.as_view(), name="scan_code"),
path('DeleteOrder', views.DeleteOrder.as_view(), name="DeleteOrder"),
path('TeleUserSignUp', views.TeleUserSignUp, name="TeleUserSignUp"),
path('TeleUserSignIn', views.TeleUserSignIn, name="TeleUserSignIn"),
]