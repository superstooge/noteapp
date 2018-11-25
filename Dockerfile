# You should always specify a full version here to ensure all of your developers
# are running the same version of Node.
FROM node:8.10.0

# Override the base log level (info).
ENV NPM_CONFIG_LOGLEVEL warn


# Install all dependencies of the current project.
COPY package.json package.json
RUN npm install



# Copy all local files into the image.
COPY . .

# Build for production.
RUN npm run build --production
EXPOSE 3004

# RUN npm start

# WORKDIR /build
# install serve
RUN npm install -g serve
# Run serve when the image is run.
CMD serve -s ./build -l 3004
# Let Docker know about the port that serve runs on.
