# Base Project
Código do projeto base usando Django 5.1.2

Crie um ambiente virtual (venv) do python3 

```python3 -m venv .venv```

Faça o acesso do seu venv do python3

```source .venv/bin/activate```

Para mais detalhes acesse [venv](https://docs.python.org/pt-br/3/library/venv.html)

Entre na pasta do projeto 

```cd base_project```

Instalação das Dependências do Projeto

```pip install -r requirements.txt```

Esse comando irá instalar todas as dependências necessárias para
o funcionamento do projeto.

Execute as migrations do DJango com o seguinte comando

```python manage.py makemigrations && python manage.py migrate```

OBS: certifique que o MySQL e/ou MongoDB esteja configurado corretamente

Rode o projeto

```python manage.py runserver```

O DJango irá dar acesso a página pelo ip ```http://127.0.0.1:8000/```
