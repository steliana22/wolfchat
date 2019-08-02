<template>
    <div class="container">      
        <form @submit.prevent="login" class="text-center">
            <div class="form-group">
                <input type="text" class="form-control" placeholder="Your name" name="name" v-model="name">
                <p v-if="errorText" class="text-danger">{{ errorText }}</p>
            </div>
            <button type="submit" class="btn btn-primary">Start chatting</button>
        </form>  
    </div>
</template>

<script>
export default {
    name: 'login',
    data () {
        return {
            name: "",
            errorText: null
        }
    },
    methods: {
        login() {
            if (this.name) {
                localStorage.setItem('username', this.name);
                this.$router.push({name: 'Chat'});
            } else {
                this.errorText = "Please enter a name first!"
            }
        }
    }
}
</script>

<style>
.login{
    display: block;
    margin-left: auto;
    margin-right: auto;
}
form {
    margin-top: 30%;
}
</style>