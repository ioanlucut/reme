`develop`: 
[![Circle CI](https://circleci.com/gh/sorinpantis/reme/tree/develop.svg?style=svg&circle-token=8c01bbe3030627e311149593f10daf9155b422d9)](https://circleci.com/gh/sorinpantis/reme/tree/develop)

`staging`: 
[![Circle CI](https://circleci.com/gh/sorinpantis/reme/tree/master.svg?style=svg&circle-token=8c01bbe3030627e311149593f10daf9155b422d9)](https://circleci.com/gh/sorinpantis/reme/tree/master)

`production`: 
[![Circle CI](https://circleci.com/gh/sorinpantis/reme/tree/production.svg?style=svg&circle-token=8c01bbe3030627e311149593f10daf9155b422d9)](https://circleci.com/gh/sorinpantis/reme/tree/production)

#Start
0. Call `sudo npm install`
1. Call `gulp serve`

#Others
0. Our commit conventions can be found here : https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit
1. Our package structure convention can be found here : https://docs.google.com/document/d/1XXMvReO8-Awi1EZXAXS4PzDzdNvV6pGcuaF4Q9821Es/mobilebasic?pli=1

#Dev release
0. `git checkout develop`
1. `git pull`
2. `git checkout master`
3. `git merge develop --no-ff`
7. `git commit -m "2.1.0-RC1 - from DEV"`
8. `git push`

#Prod release
0. `git checkout master`
1. `git pull`
2. `git checkout production`
3. `git merge master --no-ff`
7. `git commit -m "2.1.0 - LIVE"`
8. `git push`

# GULP
* Configs are three, they can be found at e.g. `app.config.production.json`. To activate the environment, just pass to the gulp arguments, e.g. `gulp serve:dist --env=local`
* Build `DEV`: `gulp build:dev`
* Build `PROD`: `gulp build:prod`
* Build `local`: `gulp build:local`
* Same applies for `gulp serve`
* Same applies for `gulp serve:dist`
* To run in localhost `gulp serve --env=local`
* Build `custom`: `gulp --env=localhost` but the configs have to be defined for that specific custom environments.
* Note: All paths are `relative`. Always use `/app/sometheing`, and not `app/something`
* More infos `https://github.com/Swiip/generator-gulp-angular`

# Protractor useful commands
* `gulp protractor-quick --protractorTests=true` Does not compile everything again and it is faster.
* `gulp protractor --protractorTests=true` Standard command.
* `gulp serve:e2e --protractorTests=true` Debug with the auto bootstrap of angular set.
* `./e2e.sh` Standard command alias.
* `./e2e.sh` Standard command alias.
