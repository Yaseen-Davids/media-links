FROM nginx as server
COPY ./config/nginx.conf /etc/nginx/nginx.conf
ONBUILD COPY --from=build /app/build /usr/share/nginx/html