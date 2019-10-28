<template>
    <div class="header py-4">
        <ul class="list-group d-flex flex-row">
            <li class="list-group-item"><router-link exact exact-active-class="active" :to="{name: 'home'}">Home</router-link></li>

            <li v-if="!isLogged" class="list-group-item ml-3"><router-link exact exact-active-class="active" :to="{name: 'login'}">Logar</router-link></li>
            <li v-else class="list-group-item ml-3"><a @click="logOut" href="#">Sair</a></li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "Header",
        data(){
            return {
                isLogged: false,
                routerLinks: []
            }
        },
        mounted(){
            this.getSession();
            this.routerLinks = this.$router.options.routes.filter(r => r.name !== 'login');

            window.console.log(this.routerLinks)
        },
        computed: {
        },
        methods:{
            getSession() {
                this.$firebase.auth().onAuthStateChanged(user => {
                    this.isLogged = !!(window.uid = user)
                })
            },
            async logOut(){
                await this.$firebase.auth().signOut();
                this.$router.push({name: 'login'});
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
