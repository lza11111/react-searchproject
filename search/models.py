from django.db import models

# Create your models here.
class ResultInfo(models.Model):
    keyword = models.CharField(max_length=50, null=False)
    pages = models.IntegerField(default=0)
    target = models.CharField(max_length=10, null=False)
    website = models.CharField(max_length=255, null=True)
    result = models.TextField()
