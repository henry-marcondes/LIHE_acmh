# public_site/forms.py

from django import forms
from .models import Usuario

class UsuarioForm(forms.ModelForm):
    class Meta:
        model = Usuario
        fields = ['nome', 'whatsapp', 'veiculo', 'email', 'senha']
        widgets = {
            'nome': forms.TextInput(attrs={'class': 'input'}),
            'whatsapp': forms.TextInput(attrs={'class': 'input'}),
            'veiculo': forms.TextInput(attrs={'class': 'input'}),
            'email': forms.EmailInput(attrs={'class': 'input'}),
            'senha': forms.PasswordInput(attrs={'class': 'input'}),
        }

