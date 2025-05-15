FROM php:8.2-apache

# 1. Establecer WORKDIR
WORKDIR /var/www/html

# 2. Copiar archivos de la aplicación
COPY . .

# 3. Configurar Apache (sin archivo externo)
RUN a2enmod rewrite headers && \
    echo "<VirtualHost *:80>\n\
    ServerAdmin webmaster@localhost\n\
    DocumentRoot /var/www/html\n\
    <Directory \"/var/www/html\">\n\
        Options Indexes FollowSymLinks\n\
        AllowOverride All\n\
        Require all granted\n\
        Header set Access-Control-Allow-Origin \"*\"\n\
        Header set Access-Control-Allow-Methods \"GET, POST, OPTIONS\"\n\
        Header set Access-Control-Allow-Headers \"Content-Type\"\n\
    </Directory>\n\
    ErrorLog \${APACHE_LOG_DIR}/error.log\n\
    CustomLog \${APACHE_LOG_DIR}/access.log combined\n\
</VirtualHost>" > /etc/apache2/sites-available/000-default.conf && \
    chown -R www-data:www-data /var/www/html && \
    find /var/www/html -type d -exec chmod 755 {} \; && \
    find /var/www/html -type f -exec chmod 644 {} \;

EXPOSE 80

CMD ["apache2-foreground"]