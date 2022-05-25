from django.db import models

# Create your models here.

class Object(models.Model):

    class Meta:
        verbose_name = 'Объект'
        verbose_name_plural = 'Объекты'

    TYPE_CHOICES = (
        ('web_studio', 'Веб-студия'),
        ('freelance', 'Фриланс'),
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
        ('Корпоративный имеджевый сайт', 'Корпоративный имеджевый сайт'),
        ('Корпоративный портал', 'Корпоративный портал'),
        ('Промо-сайт', 'Промо-сайт'),
        ('Веб-сервис', 'Веб-сервис'),
        ('Форум', 'Форум'),
        ('Блог', 'Блог'),
    )

    type = models.CharField(max_length=60, choices=TYPE_CHOICES, verbose_name='Тип', unique=True)
    for_targets = models.ManyToManyField('Target', verbose_name='Для целей', blank=True)
    description = models.TextField(verbose_name='Описание', blank=True, null=True)

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
    min_price = models.IntegerField(verbose_name='Минимальная цена', blank=True, null=True)
    max_price = models.IntegerField(verbose_name='Максимальная цена', blank=True, null=True)

    def __str__(self):
        return '{} {} Минимальная цена: {} Максимальная цена: {}'.format(self.obj.name, self.site_type.type, self.min_price, self.max_price)


class Tool(models.Model):

    class Meta:
        verbose_name = 'Инструмент для создания сайта'
        verbose_name_plural = 'Инструменты для создания сайта'

    name = models.CharField(max_length=100, verbose_name='Название')
    tool_link = models.CharField(max_length=300, verbose_name='Ссылка', blank=True, null=True)
    logo = models.ImageField(blank=True, upload_to='tool_logos', default='')
    country = models.CharField(max_length=100, verbose_name='Страна', blank=True, null=True)
    foundation_year = models.IntegerField(verbose_name='Год основания', blank=True, null=True)
    category = models.ForeignKey('ToolCategory', verbose_name='Относится к категории', related_name='tool',
                            on_delete=models.CASCADE)

    def __str__(self):
        return '{}'.format(self.name, self.category)


class ToolCategory(models.Model):

    class Meta:
        verbose_name = 'Категория инструмент для создания сайта'
        verbose_name_plural = 'Категории инструментов для создания сайта'

    name = models.CharField(max_length=60, verbose_name='Название', unique=True)

    def __str__(self):
        return '{}'.format(self.name)


class Constructor(models.Model):

    class Meta:
        verbose_name = 'Конструктор'
        verbose_name_plural = 'Конструкторы'

    tool = models.OneToOneField('Tool', verbose_name='Относится к иснтрументу',
                            on_delete=models.CASCADE, primary_key=True)
    has_free = models.BooleanField(verbose_name='Имеет бесплатный тариф', default=False)
    free_period = models.CharField(max_length=100, verbose_name='Бесплатный период', blank=True, null=True)
    min_price_for_month = models.IntegerField(verbose_name='Минимальная цена за месяц', blank=True, null=True)
    max_price_for_month = models.IntegerField(verbose_name='Максимальная цена за месяц', blank=True, null=True)
    constructor_description = models.TextField(verbose_name='Описание', blank=True, null=True)
    site_types = models.ManyToManyField('SiteType', verbose_name='Можно реализовать', blank=True)


    def __str__(self):
        return '{}'.format(self.tool.name)


class Target(models.Model):

    class Meta:
        verbose_name = 'Цель'
        verbose_name_plural = 'Цели'

    TYPE_CHOICES = (
        ('commerce', 'Коммерческая'),
        ('non_commerce', 'Некоммерческая'),
    )

    target = models.CharField(max_length=300, verbose_name='Цель', blank=True, null=True)
    target_type = models.CharField(max_length=60, choices=TYPE_CHOICES, verbose_name='Тип')

    def __str__(self):
        return '{}'.format(self.target)