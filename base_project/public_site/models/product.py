from django.db import models
from django.utils import timezone

class Product(models.Model):
    CONSTANT_LOAD_TYPE = (
        ('source', 'source'),
        ('supply', 'supply'),
    )

    product_name = models.CharField(max_length=100, default="ACME")

    power = models.DecimalField(max_digits=10, decimal_places=2, blank=False, null=False)
    power_factor = models.DecimalField(max_digits=10, decimal_places=2, blank=False, null=False, default=1.0)

    width = models.DecimalField(max_digits=10, decimal_places=2, blank=False, null=False)
    height = models.DecimalField(max_digits=10, decimal_places=2, blank=False, null=False)
    depth = models.DecimalField(max_digits=10, decimal_places=2, blank=False, null=False)
    
    load_type = models.CharField(max_length=10, choices=CONSTANT_LOAD_TYPE, blank=False, null=False)
    voltage = models.DecimalField(max_digits=10, decimal_places=2, blank=False, null=False, default=110.0)
    tipo = models.CharField(max_length=2, choices=[('AC', 'AC'), ('DC', 'DC')], blank=False, null=False, default='DC')
    peso = models.FloatField(null=True, blank=True)  # permite null no banco


    avaliable = models.BooleanField(default=True)

    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)
    
    class Meta:
        db_table = 'product'

    def __str__(self):
        return f"name {self.product_name} \
                 power {self.power} \
                 power_factor {self.power_factor} \
                 width {self.width} \
                 height {self.height} \
                 depth {self.depth} \
                 load_type {self.load_type} \
                 avaliable {self.avaliable} \
                 created_at {self.created_at} \
                 updated_at {self.updated_at}"