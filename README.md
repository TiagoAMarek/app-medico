# Aplicativo do médico
Aplicativo usado para o médico realizar seu cadastro e gerenciar sua agenda.

## Ambiente de desenvolvimento
Antes de começar certifique-se de que o [Docker](https://docs.docker.com/engine/installation/) e o [docker-compose](https://docs.docker.com/compose/install/) estão instalados em sua máquina

### 1. Build das containers 
```
sudo docker-compose build
```

### 2. Instalando dependências
```
sudo docker-compose up install_node_modules
```

### 3. Iniciar o ambiente
```
sudo docker-compose up serve
```
O app estará disponível para teste em `localhost:8100`
