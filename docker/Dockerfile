FROM nginx:latest

RUN ls /usr/share/nginx/html

RUN rm /usr/share/nginx/html/index.html

COPY ../src /usr/share/nginx/html/

EXPOSE 80
