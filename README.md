# Analise de Produção e consumo de Energia de Motor Homes

## Dependências

 * django 5.1.2
 * faker 30.8.1
 * mysqlclient 2.2.5
 * python-dotenv 1.0.1
 * whitenoise 6.9.0

## Autores:

```
LUCAS CAMPOS ACHCAR
HENRY FERNANDO ESPINDOLA MARCONDES
```

## Demo do projeto

* [Link - site de demonstração](https://pi1-univesp_1.onrender.com/)

## Preview

<p float="left">
  <img src="./images/foto_1.png" width="60%" />
  <img src="./images/foto_2.png" width="60%" />
</p>

## Instalação e Configuração

Para instalar o virtualenv no Linux Debian ou Ubuntu, utilize o comando 

```sudo apt install python3.12-venv ```
ou 

```pip install virtualenv```

Crie um ambiente virtual (venv) do python3 dentro da pasta raiz do projeto
~/pi1_univesp/  (caminho no Linux) 

```python3 -m venv .venv```

Este comando irá criar uma pasta oculta .venv/ com os binarios para executar o ambiente
virtual.

Faça o acesso do seu venv do python3

```source .venv/bin/activate```

Para mais detalhes acesse [venv](https://docs.python.org/pt-br/3/library/venv.html)

Entre na pasta do projeto 

```cd base_project```

Instalação das Dependências do Projeto

```pip install -r requirements.txt```

Esse comando irá instalar todas as dependências necessárias para
o funcionamento do projeto.

Caso tenha problemas para instalar mysqlclient no ubuntu, debian ou wsl(ubuntu)Windows

verifique se as dependências necessárias estão instaladas:
 pkg-config 
 libmysqlclient-dev
 python3-dev 
 build-essential 

## Instalação de uma instância Docker MySQL

Entre na pasta ```mysql-docker``` e digite o seguinte comando

```docker compose up -d```

OBS: Certamente você deverá habilitar o uso externo do MySQL para o 
usuário 'root'.

Caso não consiga, você pode usar outras alternativas

se a falhar por :

failed to bind host port for 0.0.0.0:3306: address already in use

Significa: a porta 3306 já está sendo usada no seu sistema.
(outra instância MySQL já está rodando e usando a porta 3306)

Primeiro, veja o que já está usando a porta 3306:

```sudo lsof -i :3306```   (Ubuntu ou wsl)

Você verá algo tipo:

mysqld   12345  seu_usuário  30u  IPv4  1234567  0t0  TCP *:3306 (LISTEN)

Se aparecer algo assim, é porque:

    Um serviço MySQL local (instalado no Ubuntu) está usando a porta.

    Ou um outro contêiner Docker já está ocupando essa porta.

    Parar o serviço que está usando 3306

Se for um MySQL instalado localmente:

```sudo systemctl stop mysql```

Se quiser deixar o MySQL local rodando e rodar o Docker MySQL, altere a configuração da porta no docker-compose.yml, por exemplo:

de: 

``` ports:
    - "3306:3306" 
```

para:
``` ports:
    - "3307:3306"
```

Assim o MySQL dentro do contêiner vai escutar pela porta 3307 no seu Ubuntu.

Depois rodar:

``` docker compose up -d ```
 
Crie (ou altere) o usuário para aceitar conexões de qualquer host (%):


``` docker exec -it project-mysql mysql -u root -p root ```

E no prompt MySQL, rode:

``` CREATE USER 'henry'@'%' IDENTIFIED BY 'sua_senha';```
``` GRANT ALL PRIVILEGES ON *.* TO 'henry'@'%' WITH GRANT OPTION;```
``` FLUSH PRIVILEGES; ```



O processo não depende do método de instalação e sim do acesso ao MySQL,
esse é o exemplo mais comum para Ubuntu, Xubunto wsl(windows)

 

## Configuração do .env

Faça uma copia do ```base_project/.env-exemplo``` para ```base_project/.env```

Abra o ```base_project/.env``` e faça as configurações do MySQL

```
DEBUG_MODE=True

DB_NAME=project         # nome do banco de dados
DB_USER=seu_usuario     # usuário do banco de dados
DB_PASSWORD=sua_senha   # senha do banco de dados
DB_HOST=127.0.0.1       # ou o IP do servidor de banco de dados
DB_PORT=3306            # porta padrão do MySQL

DJANGO_SECRET_KEY="django-insecure-fl8su)fsgsisy-!y$cz-ff=*u4@7fxh)@o#3o2riesshqzqz%-"
CSRF_COOKIE_SECURE=False
```

## Configuração das migrations do MySQL

Execute as migrations do DJango com o seguinte comando

```python manage.py makemigrations```

```python manage.py migrate```

```python manage.py migrate public_site --database=mysql_db```

Caso queira fazer testes, utilize o seguinte comando para gerar 'dados fakes'

```python manage.py fake_data```

OBS: certifique que o MySQL esteja configurado corretamente para 
todos os comandos acima funcionarem corretamente

## Rodando o Projeto

Após feito toda a instalação e configuração, digite o seguinte comando no terminal
dentro da pasta ```base_project``` 

```python manage.py runserver```

O DJango irá dar acesso a página pelo ip ```http://127.0.0.1:8000/```
