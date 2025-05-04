Para a instalação do container do MySQL entre na pasta mysql_docker e execute
o docker compose
```
docker compose up -d
```
Uma vez instaldo não há necessidade de instalar toda vez que acessar 
seu projeto. 
Para listar os containers e encontrar seu MySQL.

```docker ps -a```

A saída será algo assim:

CONTAINER ID   IMAGE                       COMMAND                  CREATED
18b39cbe0a76   mysql/mysql-server:latest   "/entrypoint.sh --de…"   5 days ago 

STATUS                      PORTS                    NAMES
Exited (128)            36 hours ago             project-mysql

O ID do seu Banco de dados está em NAMES nesse caso project-mysql

Para ativar seu banco de dados:

```docker start project-mysql ```


