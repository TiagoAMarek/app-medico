FROM node:6

MAINTAINER "Tiago Marek" <tiago.marek@deliverit.com.br>

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN npm install -g cordova ionic
RUN git config --global user.email "tiagomarek@gmail.com"
RUN git config --global user.name "TiagoAMarek"


EXPOSE 4200
EXPOSE 35729
EXPOSE 53703