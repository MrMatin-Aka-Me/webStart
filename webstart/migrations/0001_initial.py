# Generated by Django 4.0.3 on 2022-05-09 22:19

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Object',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, verbose_name='Название')),
                ('obj_type', models.CharField(choices=[('web_studio', 'Веб-студия'), ('freelance', 'Фриланс'), ('tool', 'Инструмент')], max_length=60, verbose_name='Тип')),
                ('link', models.CharField(blank=True, max_length=300, null=True, verbose_name='Ссылка')),
                ('description', models.TextField(blank=True, null=True, verbose_name='Описание')),
            ],
            options={
                'verbose_name': 'Объект',
                'verbose_name_plural': 'Объекты',
            },
        ),
        migrations.CreateModel(
            name='SiteType',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type', models.CharField(choices=[('Лендинг', 'Лендинг'), ('Интернет-магазин', 'Интернет-магазин'), ('Корпоративный портал', 'Корпоративный портал'), ('Промо-сайт', 'Промо-сайт'), ('Веб-сервис', 'Веб-сервис')], max_length=60, unique=True, verbose_name='Тип')),
            ],
            options={
                'verbose_name': 'Тип сайта',
                'verbose_name_plural': 'Типы сайтов',
            },
        ),
        migrations.CreateModel(
            name='Price',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('price', models.CharField(blank=True, max_length=10, null=True, verbose_name='Цена')),
                ('obj', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='price', to='webstart.object', verbose_name='Относится к объекту')),
                ('site_type', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='price', to='webstart.sitetype', verbose_name='Относится к объекту')),
            ],
            options={
                'verbose_name': 'Цена',
                'verbose_name_plural': 'Цены',
            },
        ),
        migrations.CreateModel(
            name='WebStudio',
            fields=[
                ('obj', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='webstart.object', verbose_name='Относится к объекту')),
                ('phone_number', models.CharField(blank=True, max_length=16, null=True, verbose_name='Телефон')),
                ('address', models.CharField(blank=True, max_length=300, null=True, verbose_name='Адрес')),
                ('logo', models.ImageField(blank=True, default='', upload_to='web_studio_logos')),
                ('site_type', models.ManyToManyField(blank=True, to='webstart.sitetype', verbose_name='Типы сайтов')),
            ],
            options={
                'verbose_name': 'Веб-студия',
                'verbose_name_plural': 'Веб-студии',
            },
        ),
    ]
