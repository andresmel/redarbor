## Redarbor-frontend
Proyecto en Javascript diseñada para administrar usuario con roles específicos. La aplicación permite agregar, eliminar, presentar usuarios existentes y actualizar usuarios. Permite eliminar varios usuarios seleccionados. También valida que no haya usuarios con el mismo nombre y apellido, valida que sea mayor de edad y uso de correos válidos.

## Desarrollo
El sistema se realizó en Javascript puro. La data se encuentra en un archivo llamado data.js. aquí encontrará un objeto con información de usuario y un objeto con información de los roles. Con estos datos se ejecuta todo el crud y validaciones, no cuenta con API “backend”, toda la lógica se encuentra en el Javascript. El front este hecho por componentes, cada componente cuenta con su respectivo html. El proyecto se ejecutó por capas. Controlador, app, validaciones, servicios, estilos y capa de datos.

## Tecnologías
-	Javascript
-	Jquery (datatable)
-	Boostrap
## estructura del proyecto
   index.html
   |_________JS
   |          |___controllers   -control la logicaa de negocio y la interaccion con el usuario 
   |          |___services      -recibe los datos desde el controlador y devuelve los datos requeridos por metodos post,get,delete , put "moqueados"
   |          |___validator     -Valida drtos de entrada de los usuarios
   |__________data
   |          |___data          -mantiene los datos de usuario y datos de role inicial
   |__________components        -componentes o piezas de interfaz de usuario. Header,table,modal,footer,form entre otros
   |__________css               -contiene los archivo css para darle etilos a los diferentes componentes de la interfaz de usuario
   |__________assets            -imagenes y/o archivos pdf

# Repositorio
Git clone https://github.com/andresmel/redarbor.git
Cd redarbor
# Servir la aplicación
Para ejecutar y/o visualizar la aplicación:
-	Node Windows o linux: Ejecutar npx serve dentro de la carpeta redarbor, este comando sirve la aplicación en la direccion localhost:3000. Debe contar con node 18+ preferiblemente.
-	XAMPP Windows o linux: Copiar los archivos dentro de Redarbor y copiarlos en la carpeta htdocs del paquete de software XAMPP, después de copiar hacer click en el servicio apache donde sirve la aplicación en localhost puerto 80 por defecto. Si el puerto está ocupado puede cambiar el puerto en el archivo apache.config
-	Linux: copiar los archivos en la carpeta /var/www/html, dar permisos a la carpeta con el usuario web-data si no tiene los permisos previamente gestionados. Por ultimo iniciar el servicio systemclt start apache2.service. si el puerto está ocupado puede cambiarlo en /etc/apache2/apache2.conf
-	Puede ejecutar la aplicación rápidamente en la dirección https://redarbor.vercel.app/ ya se encuentra en producción.
## Autor
Andres Melo 




