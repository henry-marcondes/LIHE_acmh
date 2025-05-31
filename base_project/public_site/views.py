from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.utils import timezone

from .models import Product
from .forms import UsuarioForm

# Create your views here.

# healthcheck
def health(request):
    return JsonResponse({'health': 'alive'})

# home page
def home(request):
    supply = Product.objects.filter(load_type=dict(Product.CONSTANT_LOAD_TYPE).get('supply'), avaliable=True)
    source = Product.objects.filter(load_type=dict(Product.CONSTANT_LOAD_TYPE).get('source'), avaliable=True)

    print(supply)
    print(source)

    return render(request, 'resources/home.html', {
        'supply': supply,
        'source': source,
        'timestamp': timezone.now().timestamp(),  # adiciona o timestamp
    })

def cadastro_view(request):
    if request.method == 'POST':
        form = UsuarioForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('home') # ou qualquer outra página após cadastro
    else:
        form = UsuarioForm()
    return render(request, 'resources/cadastro.html', {'form':form})



