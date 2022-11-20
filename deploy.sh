#!/bin/bash

export PATH="$PATH:$HOME/$NODE_PATH";

echo "Build..."
rm -fr dist
npm run build
if [ ! -d "dist" ]; then echo "Deploy failed!"; exit 127; fi;

echo "Deploy..."
rsync --exclude '.git' --delete -av dist/gdg-fest-mdn-fe/. $APP_PATH/.

echo "Reload Nginx"
sudo systemctl reload nginx
