FROM php:7.0-apache
RUN apt-get -yq update
RUN apt-get install -y git
RUN \
    apt-get update && \
    apt-get install libldap2-dev openssl -y && \
    rm -rf /var/lib/apt/lists/* && \
    docker-php-ext-configure ldap --with-libdir=lib/x86_64-linux-gnu/ && \
    docker-php-ext-install ldap 
RUN docker-php-ext-install mysqli pdo pdo_mysql
RUN apt-get update
RUN apt-get install -y libfreetype6-dev
RUN apt-get install -y libjpeg62-turbo-dev
RUN apt-get install -y libmcrypt-dev
RUN apt-get install -y libpng-dev
RUN docker-php-ext-install -j$(nproc) iconv mcrypt
RUN docker-php-ext-configure gd --with-freetype-dir=/usr/include/ --with-jpeg-dir=/usr/include/
RUN docker-php-ext-install -j$(nproc) gd
RUN apt install -y net-tools
RUN openssl req -new -x509 -days 365 -keyout /etc/ssl/private/ssl-cert-snakeoil.key -out /etc/ssl/certs/ssl-cert-snakeoil.pem -nodes -subj  '/O=VirtualHost Website Company name/OU=Virtual Host Website department/CN=example.com'
RUN apt-get -y install curl build-essential wget gnupg
RUN bash --version
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash -
RUN apt-get install -y nodejs
COPY testangular6 /usr/src
WORKDIR /usr/src/
RUN npm cache clean -f
RUN npm install -g n
RUN n stable
RUN npm install --force
WORKDIR /var/www/html/
COPY src/000-default.conf /etc/apache2/sites-available/000-default.conf
COPY src/default-ssl.conf /etc/apache2/sites-available/default-ssl.conf
COPY src/ports.conf /etc/apache2/ports.conf
COPY src/bin /var/www/html/bin
COPY src/src /var/www/html/src
COPY src/composer.json /var/www/html/composer.json
COPY nodewebsocket /usr/websocket
RUN a2enmod rewrite
RUN a2enmod ssl
RUN a2ensite default-ssl
RUN a2enmod rewrite proxy proxy_http proxy_wstunnel
COPY src/composer.phar /var/www/html/composer.phar
RUN php /var/www/html/composer.phar install
RUN chown -R www-data:www-data /var/www
COPY src/start.sh /etc/
EXPOSE 8080
CMD ["/bin/sh","/etc/start.sh"] 