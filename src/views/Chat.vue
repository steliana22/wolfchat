<template>
    <div class="container chat">
        <div class="userinfo">
            <div class="row">
                <div class="col-md-3"><img src="http://www.gregorydoylefirm.com/wp-content/uploads/blank-profile-pic.jpg" width="80px"></div>
                <div class="col-md-9"><h2 class="text-primary">{{ name }}</h2></div>
            </div>
        </div>
        
        <div class="searcharea">
            <div class="row">
                <div class="col-md-9"><input class="form-control" type="text" placeholder="Search" aria-label="Search"/></div>
                <div class="col-md-3"><button class="btn btn-primary" @click="pickLocation()"> + </button></div>
            </div>
        </div>
        
        <div class="card">
            <div class="card-body">
                <p class="text-secondary nomessages" v-if="users.length == 0">
                    [No messages yet!]
                </p>
                <div class="messages" v-chat-scroll="{always: false, smooth: true}">
                    <div v-for="user in users" :key="user.id">
                        <div class="chatroom" @click="gotoMessages(user.id, user.lat, user.lng)">
                            <h5 class="text-info">{{ user.chatname }}</h5> <br/>
                            <p>{{ user.lat }} <b> x </b> {{ user.lng }}</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- <div class="card-action">
                <CreateMessage :name="name"/>
            </div> -->
        </div>
    </div>
</template>

<script>
import CreateMessage from '@/components/CreateMessage'
import fb from '@/firebase/init'
import moment from 'moment'

export default {
    name: 'Chat',
    props: ['lat', 'lng'],
    components: {
        CreateMessage
    },
    data() {
        return {
            users: [],
            name: "",
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
    },
    methods: {
        pickLocation() {
            console.log("Choose the chat location on the map");
            this.$root.$emit('setLocation');
        },
        gotoMessages(messageid, lat, lng) {
            localStorage.latitude = lat;
            localStorage.longitude = lng;
            localStorage.setItem('ChatId', messageid);
            this.$router.push({name: 'Messages'});
        }
    }
}
</script>

<style>
.chat h2{
    font-size: 2.6em;
    margin-bottom: 0px;
}
.chat span{
    font-size: 1.2em;
}
.chat .time{
    display: block;
    font-size: 0.7em;
}
.messages{
    max-height: 300px;
    overflow: auto;
}
.userinfo{
    padding: 30px;
}
.chatroom {
    border: 1px solid black;
}
.searcharea {
    padding: 30px;
}
</style>