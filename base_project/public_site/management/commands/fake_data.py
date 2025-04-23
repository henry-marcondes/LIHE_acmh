from django.core.management.base import BaseCommand

import sys
import os
import random

from faker import Faker
from datetime import timedelta
from django.utils import timezone

# Adiciona o caminho do diretório pai ao sistema de módulos
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../..')))

from public_site.models import Product

fake = Faker()

class Command(BaseCommand):
    help = 'Popula o banco de dados com dados fake para teste'

    def handle(self, *args, **kwargs):
        self.create_many_product()
        self.stdout.write(self.style.SUCCESS('Dados fake gerados com sucesso!'))


    def create_many_product(self):
        source_products = [
            {
                "name": "Geladeira",
                "power": 150,
                "factor": 0.90,
                "dimensions": {"width": 0.6, "height": 1.7, "depth": 0.7}
            },
            {
                "name": "Fogão",
                "power": 10,  # apenas ignição elétrica
                "factor": 1.00,
                "dimensions": {"width": 0.6, "height": 0.9, "depth": 0.6}
            },
            {
                "name": "Micro-ondas",
                "power": 1200,
                "factor": 0.95,
                "dimensions": {"width": 0.5, "height": 0.3, "depth": 0.4}
            },
            {
                "name": "Máquina de lavar roupas",
                "power": 500,
                "factor": 0.92,
                "dimensions": {"width": 0.6, "height": 1.0, "depth": 0.7}
            },
            {
                "name": "Aspirador de pó",
                "power": 1400,
                "factor": 0.85,
                "dimensions": {"width": 0.3, "height": 0.3, "depth": 0.5}
            },
            {
                "name": "Air fryer",
                "power": 1500,
                "factor": 0.98,
                "dimensions": {"width": 0.3, "height": 0.35, "depth": 0.3}
            },
            {
                "name": "Máquina de secar roupas",
                "power": 2500,
                "factor": 0.90,
                "dimensions": {"width": 0.6, "height": 0.9, "depth": 0.6}
            },
            {
                "name": "Ar-condicionado",
                "power": 2000,
                "factor": 0.95,
                "dimensions": {"width": 0.8, "height": 0.3, "depth": 0.25}
            },
            {
                "name": "Liquidificador",
                "power": 600,
                "factor": 0.92,
                "dimensions": {"width": 0.2, "height": 0.4, "depth": 0.2}
            },
            {
                "name": "Cafeteira",
                "power": 800,
                "factor": 0.90,
                "dimensions": {"width": 0.2, "height": 0.3, "depth": 0.25}
            }
        ]

        supply_products = [
            {
                "name": "Painel solar fotovoltaico",
                "power": 330,
                "factor": 1.00,
                "dimensions": {"width": 1.0, "height": 1.7, "depth": 0.04}
            },
            {
                "name": "Gerador eólico residencial (pequeno porte)",
                "power": 1000,
                "factor": 0.95,
                "dimensions": {"width": 1.5, "height": 3.0, "depth": 1.5}
            },
            {
                "name": "Gerador a gasolina (portátil)",
                "power": 2500,
                "factor": 0.85,
                "dimensions": {"width": 0.6, "height": 0.5, "depth": 0.5}
            },
            {
                "name": "Gerador a diesel (residencial)",
                "power": 5000,
                "factor": 0.90,
                "dimensions": {"width": 1.2, "height": 1.0, "depth": 0.8}
            },
            {
                "name": "Bicicleta geradora de energia (pedal power)",
                "power": 200,
                "factor": 0.80,
                "dimensions": {"width": 0.5, "height": 1.0, "depth": 1.2}
            },
            {
                "name": "Gerador hidráulico (microturbina para riachos)",
                "power": 1500,
                "factor": 0.95,
                "dimensions": {"width": 0.6, "height": 0.8, "depth": 0.6}
            },
            {
                "name": "Estação geradora piezoelétrica (pisos com pressão)",
                "power": 5,  # por módulo
                "factor": 1.00,
                "dimensions": {"width": 0.3, "height": 0.02, "depth": 0.3}
            },
            {
                "name": "Gerador termoelétrico portátil (a lenha ou gás)",
                "power": 100,
                "factor": 0.85,
                "dimensions": {"width": 0.3, "height": 0.4, "depth": 0.3}
            }
        ]

        for source_product in source_products:
            product = Product.objects.using('mysql_db').create(
                product_name=source_product.get('name'),
                power= source_product.get('power'),
                power_factor=source_product.get('factor'),
                width=source_product.get('dimensions').get('width'),
                height=source_product.get('dimensions').get('height'),
                depth=source_product.get('dimensions').get('depth'),
                load_type=dict(Product.CONSTANT_LOAD_TYPE).get('source')
            )
            self.stdout.write(f"\tProduto 'consumidor' {product} gerado com sucesso")

        for supply_product in supply_products:
            product = Product.objects.using('mysql_db').create(
                product_name=supply_product.get('name'),
                power= supply_product.get('power'),
                power_factor=supply_product.get('factor'),
                width=supply_product.get('dimensions').get('width'),
                height=supply_product.get('dimensions').get('height'),
                depth=supply_product.get('dimensions').get('depth'),
                load_type=dict(Product.CONSTANT_LOAD_TYPE).get('supply')
            )
            self.stdout.write(f"\tProduto 'gerador' {product} gerado com sucesso")