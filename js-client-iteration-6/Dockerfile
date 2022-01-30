FROM alpine

RUN apk update \
    && apk add lighttpd \
    && rm -rf /var/cache/apk/*

COPY ./ /var/www/localhost/htdocs
COPY ./lighttpd.conf /etc/lighttpd/lighttpd.conf

CMD ["lighttpd","-D","-f","/etc/lighttpd/lighttpd.conf"]


