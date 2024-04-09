#!/bin/sh
git pull
#npm i
#npm run build
##版本号
version="v0.0.1"
#前缀
prefix="registry.cn-hangzhou.aliyuncs.com/life-project/"

docker login --username=13265695169 --password=Kkx88life  registry.cn-hangzhou.aliyuncs.com
build(){
  docker build --rm=true  -t $prefix$1":"$version $2
  docker push $prefix$1":"$version
  docker rmi $prefix$1":"$version
}
build starwars-demo  .

docker system prune -f
exit 0
