# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('search', '0002_resultinfo_pages'),
    ]

    operations = [
        migrations.AddField(
            model_name='resultinfo',
            name='website',
            field=models.CharField(max_length=255, null=True),
        ),
    ]
