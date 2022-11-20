#!/bin/bash

echo "Build..."
rm -fr dist
npm run build

echo "Deploy..."
rsync --exclude '.git' --delete -av dist/gdg-fest-mdn-fe/. $APP_PATH/.

echo "Reload Nginx"
sudo systemctl reload nginx
