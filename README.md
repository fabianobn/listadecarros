### Lista de Carros Laravel com ReactJS

- Laravel back-end
- ReactJS front-end
- Banco de Dados Mysql

Os mesmos estão separados por pasta.

# Back - End (Laravel)

##### Tecnologia usada
- Docker (Laravel Sail)
- Banco de Dados Mysql

Para usar o mesmo basta instalar através do composer
`composer install`
Que o mesmo instalará as dependencias do docker e executar o comando:
`./vendor/bin/sail up`
OBS: precisa ter o docker instalado se for usar pelo docker.

Caso queira usar através do `php artisan server`
precisa ter instalado o mysql para realização do `php artisan migrate`

Usar também o comando: `php artisan storage:link` para funcionamento das imagens.

Obs: Caso use o laravel sail os comandos devem ser usados: `./vendor/bin/sail artisan ...`

# Front - End (ReactJS)

##### Tecnologia usada
- Node V16
- NPM V8

Para colocar para funcionar o mesmo, basta executar o comando:
`npm install` para instalar as dependencias.
E em seguida executar o comando `npm run start`

### Observações
- Back - End deve estar no localhost para o mesmo funcionar, o laravel sail faz esse trabalho