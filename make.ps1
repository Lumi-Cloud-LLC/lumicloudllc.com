#!/usr/bin/env pwsh

docker build . -t lumicloudllc-com_frontend-web
docker run -p 3000:80 lumicloudllc-com_frontend-web