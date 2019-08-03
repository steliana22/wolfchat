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

### Build and run docker image locally 

docker build -t wolfchat_local_image .

docker run -it -p 8080:8080 --rm --name dockerize-vuejs-wolfchat wolfchat_local_image

### GCP infra steps

gcloud auth login

docker tag vuejs-cookbook/dockerize-vuejs-testapp eu.gcr.io/wolfchat-fcb50/wolfchat:0.1

docker push eu.gcr.io/wolfchat-fcb50/wolfchat:0.1

gcloud auth configure-docker

docker push eu.gcr.io/wolfchat-fcb50/wolfchat:0.1

gcloud components install kubectl

gcloud config set compute/zone europe-west3-a

gcloud container clusters create wolfchat-web-cluster1

gcloud container clusters get-credentials wolfchat-web-cluster1

kubectl run wolfchat-app --image eu.gcr.io/wolfchat-fcb50/wolfchat:0.1 --port 8080

kubectl expose deployment wolfchat-app --type LoadBalancer \
  --port 80 --target-port 8080

kubectl get service wolfchat-app

gcloud builds submit --config cloudbuild.yaml .                                   