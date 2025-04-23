# Proyecto Garlic Nasa

## 1. Configuracion del entorno 💻
    1. Instalacion de node
    2. Instalacion de npm
       1. npm install
       2. nmp init -y


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


# Control de versiones con git

    git init
    git remote add origin https://github.com/jsebastiantorres/GarlicPro.git

    git add README.md
    git commit -m "first commit"
    git branch -M main
    git remote add origin https://github.com/jsebastiantorres/GarlicPro.git
    git push -u origin main
