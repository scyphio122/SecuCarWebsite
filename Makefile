
WWW_PATH = /usr/share/nginx/html/secucar/public_html
SECUCAR_SITE = secucar_site

install:
	mkdir -p ${WWW_PATH}
	cp -r public_html/* ${WWW_PATH}
	chown -R konrad ${WWW_PATH}
	chmod 755 /var/www
	cp ${SECUCAR_SITE} /etc/nginx/sites-available
	rm -f /etc/nginx/sites-enabled/${SECUCAR_SITE}
	ln -s /etc/nginx/sites-available/${SECUCAR_SITE} /etc/nginx/sites-enabled/${SECUCAR_SITE}
	service nginx restart
	systemctl restart nginx.service
