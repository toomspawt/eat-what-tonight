# Generated by Django 4.1.7 on 2023-04-28 14:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_alter_user_mealtype'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='cuisineType',
            field=models.TextField(default=''),
        ),
        migrations.AlterField(
            model_name='user',
            name='dishType',
            field=models.TextField(default=''),
        ),
        migrations.AlterField(
            model_name='user',
            name='mealType',
            field=models.TextField(default=''),
        ),
    ]