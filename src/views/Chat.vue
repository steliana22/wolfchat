<template>
    <div class="container chat">
        <div class="row userinfo">
            <div class="col-md-3"><font-awesome-icon icon="user-circle" size="4x"/></div>
            <div class="col-md-9"><h3 class="username">{{ name }}</h3></div>
        </div>
        <div class="searcharea">
                    <div class="row">
                        <div class="col-md-9">
                            <input type="text" class="form-control" aria-label="Search" placeholder="Search" v-model="search"/>
                        </div>
                        <div class="col-md-3"><button class="btn btn-dark" @click="pickLocation()"><font-awesome-icon icon="plus" /></button></div>
                    </div>
                </div>
        <div class="card">
            <div class="card-body chatlist">
                <p class="text-secondary nomessages" v-if="users.length == 0"> Nothing to show here. <br/> Use the + button to create a new chat </p>
                <div class="messages" v-chat-scroll="{always: false, smooth: true}">
                    <div v-for="user in filteredList" :key="user.id">
                        <div class="chatroom" @click="gotoMessages(user.id, user.chatname, user.lat, user.lng)">
                            <div class="row">
                                <div class="col-md-9">
                                    <h5 class="text-dark userChatName">{{ user.chatname }}</h5>
                                    <small>{{ user.lat }} <b> x </b> {{ user.lng }}</small>
                                </div>
                                <div class="col-md-3">
                                    <font-awesome-icon icon="chevron-right" size="2x" style="margin-top:5px"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import fb from '@/firebase/init'
import moment from 'moment'

export default {
    name: 'Chat',
    data() {
        return {
            users: [],
            name: "",
            search: ''
        }
    },
    methods: {
        pickLocation() {
            this.$root.$emit('setLocation');
        },
        gotoMessages(messageid, chatname, lat, lng) {
            localStorage.latitude = lat;
            localStorage.longitude = lng;
            localStorage.setItem('ChatId', messageid);
            localStorage.setItem('ChatName', chatname);
            this.$router.push({name: 'Messages'});
        },
    },
    computed: {
        filteredList() {
            return this.users.filter(user => {
                return user.chatname.toLowerCase().includes(this.search.toLowerCase())
            })
        }
    },
    created() {
        let ref = fb.collection('users').orderBy('timestamp');
        ref.onSnapshot(snapshot => {
            snapshot.docChanges().forEach(change => {
                if (change.type = 'added') {
                    let doc = change.doc;
                    this.users.push({
                        id: doc.id,
                        chatname: doc.data().chatname,
                        lat: doc.data().lat,
                        lng: doc.data().lng,
                        timestamp: moment(doc.data().timestamp).format('LTS')
                    });
                }
            });
        });
    },
    mounted(){
        this.name = localStorage.getItem('username');
    }
}
</script>

<style>
.userinfo{
    padding: 30px;
    overflow: auto;
}
.chat .username {
    font-size: 2em;
    color: black;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.userChatName {
    margin-bottom: 0px;
    word-wrap: break-word;
}
.searcharea {
    padding-bottom: 10px;
}
.messages{
    height: 250px;
    overflow-y: scroll;
}
.chatroom {
    border-bottom: 2px solid black;
    text-align: left;
    padding: 5px;
}
.chatroom .row {
    width: 300px;
    margin-right: 0px; 
    margin-left: 0px;
}
.chatlist {
    height: 300px;
}
</style>