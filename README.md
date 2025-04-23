# Proyecto Garlic Nasa

## 1. Configuracion del entorno 💻
    1. Instalacion de node
    2. Instalacion de npm
       1. npm install
       2. npm init -y


## 2. Instalacion de librerias 📚
### Tailwindcss CLI 🖌️

    Comandos para la instalación de Tailwindcss CLI 
    
        1. Install Tailwind CSS
            npm install tailwindcss @tailwindcss/cli
        2. Import Tailwind in your CSS
            @import "tailwindcss";
        3. Start the Tailwind CLI build process
            npx @tailwindcss/cli -i ./src/input.css -o ./src/output.css --watch
            nota: Si no encuentra el src/input.css crearla manualmente y correr el comando nuevamente
        4. Start using Tailwind in your HTML
            <link href="./output.css" rel="stylesheet">
        5. en input.css
            @import "tailwindcss";
        6. en caso de no estar iniciando tailwind, correr este comando de nuevo
           1. npx @tailwindcss/cli -i ./src/input.css -o ./src/output.css --watch
 ___
 
 ### Instalacion fontawesome CLI 🍕
    
    comandos para la instalación de fontawesome 
    
       1. npm install --save @fortawesome/fontawesome-free
       2. en html
        <link rel="stylesheet" href="node_modules/@fortawesome/fontawesome-free/css/all.min.css">
       3. en input.css
        @import "@fortawesome/fontawesome-free/css/all.min.css";  

        Documentación instalación CLI
        https://fontawesome.com/how-to-use/on-the-web/setup/get-free-font


# Control de versiones con git 😼

## Clonar el repositorio
    
    1. Ubicarse dentro de la carpeta donde se descargara el proyecto
    2. abrir la terminal y ejecutar el comando git clone https://github.com/jsebastiantorres/GarlicPro.git
    3. moverle a la carpeta del proyecto
    4. verificar las ramas disponibles git branch -a
    5. instalar las dependencias de node.js ejecutar npm install 
    6. instalar tailwindcss cli

## Descargar las ultimas actualizaciones del repositorio

    1. git pull origin main
    2. Ver todas las ramas remotas: git branch -r
    3. Obtener todas las ramas remotas: git fetch --all
    4. Crear ramas locales basadas en las remotas: git checkout -b <branch-name> origin/<branch-name>
       1. git checkout -b develop origin/develop
    5. verificara las ramas disponibles: git branch
    6. mantener actualizadas las ramas: git pull origin develop
       1. lo mismo para cada rama
    7. 

## Crear ramas en el repositorio remoto
    Nota: solo para el admin del repositorio
    1. git branch
    2. git push origin develop
    3. git push origin qa
    4. git push origin production

## Hacer que otros equipos accedan a las ramas

    1. Obtener tadas las ramas: git fetch --all
    2. Trabajar en las ramas: ejemplo develop: git checkout -b develop origin/develop
   
