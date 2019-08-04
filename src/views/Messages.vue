<template>
    <div class="container chatcontainer" style="margin-bottom: 30px">
        <div class="userinfo">
            <div class="row">
                <div class="col-md-2"><font-awesome-icon icon="user-circle" size="4x"/></div>
                <div class="col-md-10"><h3 class="username">{{ name }}</h3></div>
            </div>
        </div>
        <div class="row goBack">
            <div class="col-md-1"><router-link to="/chat" style="color:black"><font-awesome-icon icon="chevron-left" size="2x"/></router-link></div>
            <div class="col-md-11"><h5 class="text-dark font-weight-bold">{{ chatName }}</h5></div>
        </div>
        <div class="card">
            <div class="card-body messagelist" v-chat-scroll="{always: false, smooth: true}">
                <div v-for="message in messages" :key="message.id">
                    <div v-bind:class="{ sameuser:(message.user === username)  }" class="message-box" >
                        <h5 class="text-dark">{{ message.user }}</h5>
                        <p class="message">{{message.message}}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="row newMessage">
            <form @submit.prevent="createMessage" class="form-inline">
                <div class="form-group">
                    <input type="text" name="message" class="form-control" placeholder="Type a message" v-model="newmessage">
                    <p class="text-danger" v-if="errorText">{{ errorText }}</p>
                    <button class="btn btn-dark" type="submit" name="action">Send</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import fb from '@/firebase/init'
import moment from 'moment'

export default {
    name: 'Messages',
    data() {
        return {
            messages: [],
            newmessage: null,
            errorText: null,
            username: localStorage.username,
            chatId: localStorage.ChatId,
            chatName: localStorage.ChatName,
            name: ""
        }
    },
    methods: {
        createMessage () {
            if (this.newmessage) {
                fb.collection('chatrooms/'+ this.chatId + '/messages').add({
                    user: this.username,
                    message: this.newmessage,
                    timestamp: Date.now()
                })
                this.newmessage = null;
                this.errorText = null;
            } else {
                this.errorText = "A message must be entered first!";
            }
        }
    },
    mounted(){
        this.name = localStorage.getItem('username');
    },
    created() {
        let ref = fb.collection('chatrooms/'+ this.chatId + '/messages').orderBy('timestamp');
        ref.onSnapshot(snapshot => {
            snapshot.docChanges().forEach(change => {
                if (change.type = 'added') {
                    let doc = change.doc;
                    this.messages.push({
                        id: doc.id,
                        user: doc.data().user,
                        message: doc.data().message,
                        timestamp: moment(doc.data().timestamp).format('LTS')
                    });
                }
            });
        });

        this.$root.$emit('showMarker');
    },
    beforeDestroy() {
        this.$root.$emit('hideMarker');
    }
}
</script>

<style>
.chatcontainer {
    max-height: 500px;
    overflow-y: scroll;
}
.messagelist {
    height: 250px;
    overflow-y: scroll;
}
.message-box {
    float: left;
    width: 200px;
}
.message {
    border: 1px solid grey;
    background-color: lightgrey;
    padding: 5px;
    word-wrap: break-word;
    border-radius: 3px;
}
.sameuser {
    float: right;
}
.sameuser .message {
    background-color: lightblue;
}
.username {
    font-size: 2em;
    color: black;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.newMessage {
    width:350px;
    padding: 10px;
    text-align: center;
}
.newMessage .form-group input{
    width:270px;
}
.goBack {
    padding-bottom: 10px;
}
</style>