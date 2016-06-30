FROM node:5.11.1

ENV HOME=/var/www
RUN mkdir -p $HOME
ADD package.json $HOME/stencil/
WORKDIR $HOME/stencil
RUN npm install

COPY . $HOME/stencil

CMD ["pwd"]
