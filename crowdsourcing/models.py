from django.db import models
# from djangotoolbox.fields import ListField, EmbeddedModelField
# from django_mongodb_engine.storage import GridFSStorage
import datetime

# gridfs_storage = GridFSStorage()
class Subscription(models.Model):
    name = models.CharField(max_length=15)
    link = models.CharField(max_length = 100)
    description = models.CharField(max_length = 200)

class Story(models.Model):
    subscription = models.ForeignKey(Subscription, null=True, on_delete=models.SET_NULL)
    ncl = models.CharField(max_length = 20)
    rtc_link = models.CharField(max_length = 100)
    see_all_link = models.CharField(max_length = 100)
    rss_link = models.CharField(max_length = 100)
    headline = models.CharField(max_length = 50)
    last_update = models.DateTimeField(auto_now=True)
    # articles = ListField(EmbeddedModelField('Article'))

class Article(models.Model):
    story = models.ForeignKey(Story, null=True, on_delete=models.SET_NULL)
    link = models.CharField(max_length = 100)
    title = models.CharField(max_length = 100)
    source = models.CharField(max_length = 50)
    guid = models.CharField(max_length = 50)
    text = models.TextField()
    authors = models.CharField(max_length = 60)
    date = models.DateTimeField(auto_now_add=True)
    # images = ListField(EmbeddedModelField('Image'))

class Image(models.Model):
    article = models.ForeignKey(Article, null=True, on_delete=models.SET_NULL)
    url = models.CharField(max_length = 20)
    file = models.FileField(upload_to='')
    meta_data = models.CharField(max_length=100)
