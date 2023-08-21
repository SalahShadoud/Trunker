# Generated by Django 4.2 on 2023-08-19 15:58

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('App', '0011_teleuser_teleorder'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='teleuser',
            name='user',
        ),
        migrations.AddField(
            model_name='teleuser',
            name='password',
            field=models.CharField(default='123456789', max_length=20, validators=[django.core.validators.MinLengthValidator(8)]),
        ),
        migrations.AddField(
            model_name='teleuser',
            name='username',
            field=models.CharField(default='nnn', max_length=25),
        ),
    ]
