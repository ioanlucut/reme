#!/bin/sh

#The development master we use
MASTER_BRANCH=master

#The development branch we use
DEVELOP_BRANCH=develop

init(){
    removeBuildContent && checkoutDev && mergeInDev $1
}

removeBuildContent (){
     #remove build content
     echo "remove build directory $DEVELOP_BRANCH"
     rm -rf build/
     return 0
}

checkoutDev (){
     #checkout develop branch
     echo "checkout develop branch $DEVELOP_BRANCH"
     git checkout "$DEVELOP_BRANCH"

     return 0
}

mergeInDev (){
     if [ $# -eq 1 ]
        then
             #merge feature branch to develop branch
             echo "merge $1 to develop branch $DEVELOP_BRANCH"
             git merge "$1" --no-ff
             echo "show git status of develop branch after merge $1 in $DEVELOP_BRANCH"
             git status
        else
            echo "Feat branch is not specified. Skip merge from feat branch to develop."
      fi

      return $?
}

checkoutMaster (){
     #checkout master branch
     echo "checkout master branch $MASTER_BRANCH"
     git checkout "$MASTER_BRANCH"

     return 0
}

mergeInMaster (){
     #merge develop branch to master
     echo "merge $DEVELOP_BRANCH to master branch $MASTER_BRANCH"
     git merge "$DEVELOP_BRANCH" --no-ff

     return 0
}

build (){
     #run grunt build
     echo "run grunt build in master branch $MASTER_BRANCH"
     grunt build

     return 0
}