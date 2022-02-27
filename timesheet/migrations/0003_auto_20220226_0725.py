# Generated by Django 3.2.8 on 2022-02-26 07:25

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('timesheet', '0002_auto_20220225_0345'),
    ]

    operations = [
        migrations.AlterField(
            model_name='commit',
            name='task',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='commits', to='timesheet.task'),
        ),
        migrations.AlterUniqueTogether(
            name='daily',
            unique_together={('day', 'user')},
        ),
    ]
