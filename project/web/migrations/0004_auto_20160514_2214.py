# -*- coding: utf-8 -*-
# Generated by Django 1.9 on 2016-05-14 22:14
from __future__ import unicode_literals

import datetime
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('web', '0003_auto_20160503_0318'),
    ]

    operations = [
        migrations.AddField(
            model_name='analysis',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, default=datetime.datetime(2016, 5, 14, 22, 14, 37, 280496, tzinfo=utc)),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='analysis',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='owner', to=settings.AUTH_USER_MODEL),
        ),
    ]
