docker stop lighttpd
docker rm lighttpd
docker build . -t lighttpd
docker run -d --name lighttpd -p 3000:3000 lighttpd



# https://github.com/jlesage/docker-firefox

# try to execute test.html and write via additional endpoint the results to a file.
# boah really hack stuff to automate those tests.........
