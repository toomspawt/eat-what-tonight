# Generated by Django 4.1.7 on 2023-04-28 14:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_user_cuisinetype_user_dishtype_user_mealtype'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='mealType',
            field=models.TextField(choices=[('', ''), ('breakfast', 'breakfast'), ('lunch', 'lunch'), ('dinner', 'dinner'), ('snack', 'snack'), ('teatime', 'teatime')], default=(('', ''), ('breakfast', 'breakfast'), ('lunch', 'lunch'), ('dinner', 'dinner'), ('snack', 'snack'), ('teatime', 'teatime'))),
        ),
    ]
