# this dockerfile is used to build and run the application inside a production-ready container. 

# use official node.js version as the base image
FROM node:22-bullseye

# set working directory inside container
WORKDIR /app

# copy package files and install dependencies
COPY package*.json ./
RUN npm install

# set build-time environment variables for supabase
ARG NEXT_PUBLIC_SUPABASE_URL
ARG NEXT_PUBLIC_SUPABASE_ANON_KEY

# copy the rest of the app
COPY . .

# build the next.js app
RUN npm run build

# expose the default next.js port
EXPOSE 3000

# start the app in production mode
CMD ["npm", "start"]
