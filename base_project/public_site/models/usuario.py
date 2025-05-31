# public_site/models/usuario.py

from django.db import models

class Usuario(models.Model):
    nome = models.CharField(max_length=100)
    whatsapp = models.CharField(max_length=20)
    veiculo = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    senha = models.CharField(max_length=128)  # Use hashing posteriormente

    def __str__(self):
        return self.nome
