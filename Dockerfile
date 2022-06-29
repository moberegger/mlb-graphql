#
# Builder stage.
# This state compile our TypeScript to get the JavaScript code
#
FROM node:18.4.0 AS build

WORKDIR /usr/src/app

# Get npm up-to-date to match npm engine in package json
RUN npm -g install npm
COPY . .
# Do clean install and build typescript project
RUN npm ci --quiet && npm run build

#
# Production stage.
# This state compile get back the JavaScript code from builder stage
# It will also install the production package only
#
FROM node:18.4.0-alpine

# USER node
ENV NODE_ENV=production
EXPOSE 4000
WORKDIR /usr/src/app

# Get npm up-to-date to match npm engine in package json
RUN npm -g install npm
COPY --from=build /usr/src/app/dist ./src
COPY --from=build /usr/src/app/package.json /usr/src/app/package-lock.json ./
# Do clean production install
RUN npm ci --quiet --production

# Run the app
CMD [ "node", "src/index.js" ]
