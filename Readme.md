#Start
0. Call `sudo npm install`
1. Call `bower install`
2. Start apache (e.g. `sudo /etc/init.d/apache2 start`)
3. Do not forget about `grunt && grunt watch` if you want to keep js files always updated in your browser
4. Build in dev : `grunt build`
5. Build in prod : `grunt build-prod`

#Others
0. Our commit conventions can be found here : https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit
1. Our package structure convention can be found here : https://docs.google.com/document/d/1XXMvReO8-Awi1EZXAXS4PzDzdNvV6pGcuaF4Q9821Es/mobilebasic?pli=1

#Dev release
0. git checkout develop
1. git pull
2. git checkout master
3. git merge develop --no-ff
4. grunt build
5. git add build --force
6. git add src/app/app.env.config.js --force
7. git commit -m "2.1.0-RC1 - from DEV"
8. git push

#Prod release
0. git checkout master
1. git pull
2. git checkout production
3. git merge master --no-ff
4. grunt build-prod
5. git add build --force
6. git add src/app/app.env.config.js --force
7. git commit -m "2.1.0 - LIVE"
8. git push