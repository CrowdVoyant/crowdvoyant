from django.db import models
from djangotoolbox.fields import ListField, EmbeddedModelField
import datetime

class Story(models.Model):
    ncl = models.CharField()
    rss_link = models.CharField()
    articles = ListField(EmbeddedModelField('Article'))

class Article(models.Model):
    link = models.CharField()
    text = models.TextField()
    images = ListField(EmbeddedModelField('Image'))

class Image(models.Model):
    url = models.CharField()
    file = models.FileField(storage=gridfs_storage, upload_to='/')

    
