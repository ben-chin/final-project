# -*- coding: utf-8 -*-
# Generated by Django 1.9 on 2016-05-14 22:39
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('web', '0004_auto_20160514_2214'),
    ]

    operations = [
        migrations.AlterField(
            model_name='categoryanalysis',
            name='category',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='web.Category'),
        ),
    ]
