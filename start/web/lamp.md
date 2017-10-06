# Instalar LAMP

> LAMP: Linux, Apache, MySQL, PHP.

Actualizaremos el sistema de repositorios mediante los siguientes comandos:

```
apt-get update
apt-get upgrade
```

## Apache

El primer paso es la instalación de Apache, quien cumple con la función de servidor web y te permite la interpretación de páginas HTML, es la base sobre los que instalaremos los demás componentes.

```
apt-get install apache2
```

Para validar la instalación de apache en tu PC accede desde de tu PC a localhost:

http://localhost/

Así mismo puedes acceder desde otro dispositivo dentro de tu red, primero necesitas conocer la IP de tu PC, si no la conoces, puedes conocerla mediante el comando:

```
ifconfig
```

![](https://www.atlantic.net/community/wp-content/uploads/2015/02/anet-linux-apache-mysql-and-php-lamp-on-ubuntu-14-04-01.png)

Y la encontrarás disponible después de inet addr.

## MySQL

El gestor de base de datos más popular es MySQL, otras distribuciones se inclinan por MariaDB un Fork de MySQL pero ese es otro tema, con MySQL puedes crear bases de datos y conectarlas fácilmente con tus sitios web. Recuerda, el almacenamiento de la información es tan importante por ser uno de los activos más importantes. Instala MySQL mediante la siguiente línea de código:

```
sudo apt-get install mysql-server php-mysql
```

Durante la instalación te pedirá que ingreses la clave del usuario “root” este es el usuario administrador y más importante de toda la instalación así que es importante que le configures una clave buena y fácil de recordar para ti.

Importante, para asegurar su instalación de MySQL deberá de realizar algunos ajustes de seguridad, aquí te dejamos la manera mas fácil de hacerlo.

### MySQL Hardening

¿Sabias que el 77% de todos los sitios web poseen vulnerabilidad? ¿Que cada mes se descubre un nuevo fallo de seguridad importante? Puedes obtener mas estadísticas interesantes en este [Oracle Report](https://www.doag.org/formes/servlet/DocNavi?action=getFile&did=7535404).

Estas vulnerabilidades consisten en controles de acceso depiles, autentificacion fáciles, falta de encriptacion, respaldos inseguros, y la lista puede continuar.

Una vez que has realizado tu instalación es sumamente recomendable agregarle una capa de seguridad, es cuando introducimos el tema de hardening, en la mayoría de los casos consiste en buenas practicas, cambios de privilegios y perfiles, accesos, administración entre otros. Por suerte todo esto se puede hacer en un sencillo comando:

```
sudo mysql_secure_installation
```

Este comando te permitira:

* Actualizar el plugin de contraseñas
* Establecer una clave para el usuario (en caso de que ya la tengas esta parte es opcional)
* Remover accesos fuera del host al usuario root
* Remover cuentas de usuarios anónimos
* Remover bases de datos de pruebas y los privilegios que permitan que cualquiera pueda acceder a bases que inician con la palabra test_

Recomendamos realizar este paso desde el momento de la instalación de MySQL ya que posterior a esta especie de hardening se establecen políticas de acceso y contraseña y pueda que afecten las consultas de tus usuarios si hay aplicaciones con malas practicas.

***Notas importantes***

Este proceso deshabita la administración remota por medio del usuario root así que si realizas esta función deberas de reconfigurar tu servidor para que permita estas conexiones desde afuera.

## PHP

Una vez que ya tienes instalado el servidor web y el gestor de la base de datos, instalemos el lenguaje de programación, PHP.

```
sudo apt-get install php libapache2-mod-php php-mcrypt php-mysql
```

Para probar la instalación de todos los componentes realizaremos un archivo de prueba de PHP, donde nos muestre información de nuestro sistema, crearemos un archivo llamado info.php

```
nano /var/www/html/info.php
```

En el cuerpo del archivo agrega el siguiente código:

```php
<?php phpinfo(); ?>
```

Una vez que hemos instalado todos los componentes reiniciamos el servicio de Apache:

```
service apache2 restart
```

Probemos el archivo que acabamos de crear de información:

http://localhost/info.php

Si todo ha salido bien veremos la siguiente página con la información de nuestra instalación y configuración:

![](https://www.atlantic.net/community/wp-content/uploads/2016/03/install-linux-anet-apache-mysql-php-lamp-stack-on-ubuntu-16-04-06.png)

¡Felicidades! ¡Has instalado tu servidor web!

## phpMyAdmin

Ahora es momento de poder integrar un gestor de base de datos, el popular phpMyAdmin. Te mostraremos los sencillos pasos que debes de seguir para poder instalarlo.

Hablemos un poco de phpMyAdmin, y es que la herramienta más popular para poder gestionar nuestra base de datos en MySQL y lo mejor es que aprovechamos la oportunidad de tener nuestro servidor web listo y corriendo. phpMyAdmin se maneja en una interfaz web, por lo que tienes la facilidad de gestionar muchas tareas de una manera más sencilla, sin necesidad de conocerte todos los comandos. Te permite desde crear el esquema de tablas hasta poder respaldarla.

Para instalar phpMyAdmin solo necesitas ejecutar el siguiente comando:

```
sudo apt-get update
sudo apt-get install phpmyadmin
```

Algo **importante** es que en este paso te pedirá que selecciones el servidor web donde se almancenará la aplicación, es obligatorio que selecciones con la barra espaciadora Apache o el que designes, no hacer esto provocará que los archivos no se copien correctamente y después no puedas encontrar la aplicación instalada.

Es recomendabe habilitar la función mcrypt de php, para esto ejecutamos en la consola:

```
sudo phpenmod mcrypt
```

Ahora que está instalado y todo debería estar corriendo bien debemos de reiniciar el servidor Apache:

```
sudo service apache2 restart
```

¡Listo! Ya puedes conectarte a tu base de datos desde una interfaz web. Lo puedes hacer en el enlace:

http://localhost/phpmyadmin