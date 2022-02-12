## stop and clean up docker container and image
########################################
docker stop frontend-vak
docker rm frontend-vak


## assemble code
########################################
rm -rf ./build
cp -r ../js-client-iteration-6 ./build

# override server configs
cp ./index.html ./build/index.html
cp ./config.js  ./build/config.js
cp ./lighttpd.conf ./build/lighttpd.conf


## build and start image
########################################
docker build . -t frontend-vak
docker run -d --name frontend-vak -p 3000:3000 frontend-vak


## clean up
########################################
rm -rf ./build