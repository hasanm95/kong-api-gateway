FROM kong:latest
USER root

# Install Node.js and npm from NodeSource
RUN apt-get update && \
    apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs && \
    npm install -g kong-pdk

# Setup plugin directory
RUN mkdir -p /usr/local/kong/js-plugins

# Copy plugin files
COPY ./js-plugins /usr/local/kong/js-plugins

# Install plugin dependencies
RUN cd /usr/local/kong/js-plugins && npm install

USER kong