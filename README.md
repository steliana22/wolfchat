VueJs App with Leaflet and Firebase

Inspired from: https://medium.com/codingthesmartway-com-blog/building-a-real-time-chat-application-with-vue-js-and-firebase-part-1-670c768ad860 
and using leaflet tile layer: https://codepen.io/riko11/pen/GExZzQ

# chat

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### Build and run docker image locally --- http://localhost:8080

-- inspired from: https://mherman.org/blog/dockerizing-a-vue-app/

docker build -t wolfchat_local_image .

docker run -it -p 8080:80 --rm --name dockerize-vuejs-wolfchat wolfchat_local_image

### GCP infra steps

-- followed gcp documentation: https://cloud.google.com/kubernetes-engine/docs/quickstart , https://cloud.google.com/container-registry/docs/pushing-and-pulling

gcloud auth login

docker tag vuejs-cookbook/dockerize-vuejs-testapp eu.gcr.io/wolfchat-fcb50/wolfchat:0.1

docker push eu.gcr.io/wolfchat-fcb50/wolfchat:0.1

gcloud auth configure-docker

docker push eu.gcr.io/wolfchat-fcb50/wolfchat:0.1

gcloud components install kubectl

gcloud config set compute/zone europe-west3-a

gcloud container clusters create wolfchat-web-cluster1

gcloud container clusters get-credentials wolfchat-web-cluster1


##test run

kubectl run wolfchat-web --image eu.gcr.io/wolfchat-fcb50/wolfchat:0.2 --port 8080

kubectl expose deployment wolfchat --type LoadBalancer \
  --port 80 --target-port 8080

kubectl get service wolfchat-web

                             
### CI/CD

--cloud build

https://medium.com/platformer-blog/ci-cd-with-gke-and-google-cloud-build-98a797ecf346

