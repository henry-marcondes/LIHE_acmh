from django.shortcuts import render
from .models import Product

# Create your views here.
def home(request):
    supply = Product.objects.filter(load_type=dict(Product.CONSTANT_LOAD_TYPE).get('supply'), avaliable=True)
    source = Product.objects.filter(load_type=dict(Product.CONSTANT_LOAD_TYPE).get('source'), avaliable=True)
    
    print(supply)
    print(source)

    return render(request, 'resources/home.html', {
        'supply': supply,
        'source': source,
    })