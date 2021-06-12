FROM node
RUN mkdir -p /src/app
WORKDIR /src/app
COPY package.json /src/app/
RUN npm install
COPY . /src/app
CMD ["node", "mariadbscript.js"]
RUN apt-get update
RUN apt-get install -y vim
