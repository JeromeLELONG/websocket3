start: ## Start the client and server in docker for local development
	docker-compose up --build
stop: ## Start the client and server in docker for local development
	docker-compose down

install-php: 
	docker-compose -f docker-compose.yml run --rm --no-deps apache php /var/www/html/composer.phar install

install-node:
	docker-compose -f docker-compose.yml run --rm --no-deps apache npm install --prefix /usr/src/
install: install-php install-node

reload-apache: 
	docker-compose -f docker-compose.yml run --rm --no-deps apache /usr/sbin/apache2ctl  graceful