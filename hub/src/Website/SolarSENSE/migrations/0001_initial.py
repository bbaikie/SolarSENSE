# Generated by Django 2.2.7 on 2020-01-22 04:18

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='SensorData',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('temperature', models.DecimalField(decimal_places=2, max_digits=5)),
                ('water', models.DecimalField(decimal_places=2, max_digits=5)),
                ('phosphate', models.DecimalField(decimal_places=2, max_digits=5)),
                ('sunshine', models.DecimalField(decimal_places=2, max_digits=5)),
            ],
        ),
    ]
