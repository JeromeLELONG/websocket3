#!/bin/bash

# Start the first process
#/usr/sbin/apache2ctl -D FOREGROUND
exec apache2-foreground &
exec php /var/www/html/bin/chat-server.php &
exec npm start --prefix /usr/src/ &
exec npm run start --prefix /usr/websocket/