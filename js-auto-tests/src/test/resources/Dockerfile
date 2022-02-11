FROM alpine

RUN apk update \
    && apk add lighttpd \
    && rm -rf /var/cache/apk/*

# copy frontend code
COPY ./ /var/www/localhost/htdocs

# override server config files with prepared configs.
COPY ./selenium-lighttpd.conf /etc/lighttpd/lighttpd.conf
COPY ./selenium-config.js /var/www/localhost/htdocs/config.js
COPY ./selenium-test.html /var/www/localhost/htdocs/test.html

CMD ["lighttpd","-D","-f","/etc/lighttpd/lighttpd.conf"]