# Generated by Django 4.2 on 2023-08-01 18:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('App', '0006_reports_reply_time'),
    ]

    operations = [
        migrations.AlterField(
            model_name='reports',
            name='reply_time',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]
