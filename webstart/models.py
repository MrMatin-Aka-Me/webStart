from django.db import models

# Create your models here.

class Object(models.Model):

    class Meta:
        verbose_name = 'Объект'
        verbose_name_plural = 'Объекты'

    TYPE_CHOICES = (
        ('web_studio', 'Веб-студия'),
        ('freelance', 'Фриланс'),
        ('tool', 'Инструмент')
    )

    name = models.CharField(max_length=100, verbose_name='Название')
    obj_type = models.CharField(max_length=60, choices=TYPE_CHOICES, verbose_name='Тип')
    link = models.CharField(max_length=300, verbose_name='Ссылка', blank=True, null=True)
    description = models.TextField(verbose_name='Описание', blank=True, null=True)

    def __str__(self):
        return '{}'.format(self.name)


class Contractor(models.Model):

    class Meta:
        verbose_name = 'Подрядчик'
        verbose_name_plural = 'Подрядчики'

    obj = models.OneToOneField('Object', verbose_name='Относится к объекту',
                            on_delete=models.CASCADE, primary_key=True)
    phone_number = models.CharField(max_length=70, verbose_name='Телефон', blank=True, null=True)
    address = models.CharField(max_length=500, verbose_name='Адрес', blank=True, null=True)
    projects = models.ManyToManyField('SiteType', verbose_name='Типы сайтов', blank=True)
    logo = models.ImageField(blank=True, upload_to='web_studio_logos', default='')

    def __str__(self):
        return '{}'.format(self.obj.name)



class SiteType(models.Model):

    class Meta:
        verbose_name = 'Тип сайта'
        verbose_name_plural = 'Типы сайтов'

    TYPE_CHOICES = (
        ('Лендинг', 'Лендинг'),
        ('Интернет-магазин', 'Интернет-магазин'),
        ('Корпоративный портал', 'Корпоративный портал'),
        ('Промо-сайт', 'Промо-сайт'),
        ('Веб-сервис', 'Веб-сервис')
    )

    type = models.CharField(max_length=60, choices=TYPE_CHOICES, verbose_name='Тип', unique=True)

    def __str__(self):
        return '{}'.format(self.type)




class Price(models.Model):

    class Meta:
        unique_together = ['obj', 'site_type']
        verbose_name = 'Цена'
        verbose_name_plural = 'Цены'

    obj = models.ForeignKey('Object', verbose_name='Относится к объекту', related_name='price',
                            on_delete=models.CASCADE)
    site_type = models.ForeignKey('SiteType', verbose_name='Относится к типу сайта', related_name='price',
                            on_delete=models.CASCADE)
    min_price = models.CharField(max_length=16, verbose_name='Минимальная цена', blank=True, null=True)
    max_price = models.CharField(max_length=16, verbose_name='Максимальная цена', blank=True, null=True)

    def __str__(self):
        return '{} {} Минимальная цена: {} Максимальная цена: {}'.format(self.obj.name, self.site_type.type, self.min_price, self.max_price)