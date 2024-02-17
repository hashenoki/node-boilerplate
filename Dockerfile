FROM node:18.4.0 as base

COPY . ./

# Install deps
RUN yarn install --ignore-engines --only=production

# Build dist
RUN yarn build

# Start production image build
FROM node:18.4.0

# Copy node modules and build directory
COPY --from=base ./package.json ./
COPY --from=base ./node_modules ./node_modules
COPY --from=base ./build ./build

ENV NODE_ENV production
ENV NODE_PATH ./build

EXPOSE 8000

ENTRYPOINT [ "node", "build/index.js"]
