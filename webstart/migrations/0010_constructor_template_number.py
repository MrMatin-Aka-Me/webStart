# Generated by Django 4.0.3 on 2022-05-27 21:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('webstart', '0009_alter_constructor_site_types'),
    ]

    operations = [
        migrations.AddField(
            model_name='constructor',
            name='template_number',
            field=models.IntegerField(blank=True, null=True, verbose_name='Количество шаблонов'),
        ),
    ]
