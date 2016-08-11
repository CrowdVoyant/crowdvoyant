# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Article',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('link', models.CharField(max_length=100)),
                ('title', models.CharField(max_length=100)),
                ('source', models.CharField(max_length=50)),
                ('guid', models.CharField(max_length=50)),
                ('text', models.TextField()),
                ('authors', models.CharField(max_length=60)),
                ('date', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Image',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('url', models.CharField(max_length=20)),
                ('file', models.FileField(upload_to=b'')),
                ('meta_data', models.CharField(max_length=100)),
                ('article', models.ForeignKey(on_delete=django.db.models.deletion.SET_NULL, to='crowdsourcing.Article', null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Story',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('ncl', models.CharField(max_length=20)),
                ('rtc_link', models.CharField(max_length=100)),
                ('see_all_link', models.CharField(max_length=100)),
                ('rss_link', models.CharField(max_length=100)),
                ('headline', models.CharField(max_length=50)),
                ('last_update', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='Subscription',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=15)),
                ('link', models.CharField(max_length=100)),
                ('description', models.CharField(max_length=200)),
            ],
        ),
        migrations.AddField(
            model_name='story',
            name='subscription',
            field=models.ForeignKey(on_delete=django.db.models.deletion.SET_NULL, to='crowdsourcing.Subscription', null=True),
        ),
        migrations.AddField(
            model_name='article',
            name='story',
            field=models.ForeignKey(on_delete=django.db.models.deletion.SET_NULL, to='crowdsourcing.Story', null=True),
        ),
    ]
