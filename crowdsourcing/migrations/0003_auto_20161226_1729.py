# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import datetime
from django.utils.timezone import utc
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('crowdsourcing', '0002_meme'),
    ]

    operations = [
        migrations.AddField(
            model_name='meme',
            name='bottomCaption',
            field=models.CharField(default=datetime.datetime(2016, 12, 26, 17, 29, 3, 772088, tzinfo=utc), max_length=50),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='meme',
            name='date',
            field=models.DateTimeField(default=datetime.datetime(2016, 12, 26, 17, 29, 18, 619655, tzinfo=utc), auto_now_add=True),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='meme',
            name='description',
            field=models.CharField(default='description', max_length=100),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='meme',
            name='image1',
            field=models.ForeignKey(related_name='meme_primary', on_delete=django.db.models.deletion.SET_NULL, to='crowdsourcing.Image', null=True),
        ),
        migrations.AddField(
            model_name='meme',
            name='image2',
            field=models.ForeignKey(related_name='meme_secondary', on_delete=django.db.models.deletion.SET_NULL, to='crowdsourcing.Image', null=True),
        ),
        migrations.AddField(
            model_name='meme',
            name='story',
            field=models.ForeignKey(on_delete=django.db.models.deletion.SET_NULL, to='crowdsourcing.Story', null=True),
        ),
        migrations.AddField(
            model_name='meme',
            name='topCaption',
            field=models.CharField(default='hello world', max_length=50),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='meme',
            name='user',
            field=models.CharField(default='admin', max_length=50),
            preserve_default=False,
        ),
    ]
