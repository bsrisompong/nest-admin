FROM node:15.4
# specify node version
# This is a container that contains node.

WORKDIR /app
# work directories (optional)
COPY package.json .
# copy package.json to  the working directory

RUN npm install
# install dependencies inside Docker container
COPY . .
# copy all the other files

CMD npm run start:dev
#run the command