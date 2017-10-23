# learningcode_ide

## Frontend
npm install -g vue-cli
cd client/
npm install
npm run dev

## Server
cd ../server/
npm install -g pm2
npm install
pm2 start server.json

## Electron
cd client/
npm install
npm run build
cd ../electron
npm install
gulp
npm start