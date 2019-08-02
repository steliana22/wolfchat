<template>
    <div class="container" style="margin-bottom: 30px">
        <div class="" v-for="message in messages" :key="message.id">
            <div v-bind:class="{ sameuser:(message.user === username)  }" class="message-box" >
                <h5 class="text-info">{{ message.user }}</h5>
                <p>{{message.message}}</p>
            </div>
        </div>
        <form @submit.prevent="createMessage">
            <div class="form-group">
                <input type="text" name="message" class="form-control" placeholder="Enter message ..." v-model="newmessage">
                <p class="text-danger" v-if="errorText">{{ errorText }}</p>
            </div>
            <button class="btn btn-primary" type="submit" name="action">Send</button>
        </form>
        <!-- <div class="card-action">
            <CreateMessage :name="name"/>
        </div> -->
    </div>
</template>

<script>
import fb from '@/firebase/init'
import moment from 'moment'
import L from 'leaflet'

export default {
    name: 'Messages',
    data() {
        return {
            messages: [],
            newmessage: null,
            errorText: null,
            username: localStorage.username,
            chatId: localStorage.ChatId
        }
    },
    methods: {
        createMessage () {
            if (this.newmessage) {
                fb.collection('users/'+ this.chatId + '/messages').add({
                    user: this.username,
                    message: this.newmessage,
                    timestamp: Date.now()
                }).catch(err => {
                    console.log(err);
                });
                this.newmessage = null;
                this.errorText = null;
            } else {
                this.errorText = "A message must be entered first!";
            }
        }
    },
    created() {
        let ref = fb.collection('users/'+ this.chatId + '/messages').orderBy('timestamp');
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
.message-box {
    float:left;
    text-align: left;
    background-color: rgba(147, 181, 226, 0.363);
    width: 300px;
}
.sameuser {
    float: right;
    background-color: blueviolet;
    text-align: right;
}
</style>