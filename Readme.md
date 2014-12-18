0. Call `sudo npm install`
1. Call `bower install`
2. Start apache (e.g. `sudo /etc/init.d/apache2 start`)
3 Do not forget about `grunt && grunt watch` if you want to keep js files always updated in your browser
4. You can use utility script named `. ./build.sh`. In order to use this script, call it in order to have functions in context, by using : `. ./build.sh`.
8. Commit locally, push and deploy: `commitPushDeploy "my commit message"`
9. Deploy live : `deploy`