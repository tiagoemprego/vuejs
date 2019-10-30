<template>
    <div>
        <form @submit.prevent="postFB">
            <div class="form-group">
                <label for="email">Email</label>
                <input
                        id="email"
                        v-model="email"
                        type="email"
                        class="form-control"
                        placeholder="Email">
            </div>
            <div class="form-group">
                <label for="password">Nome</label>
                <input
                        id="password"
                        v-model="password"
                        type="password"
                        class="form-control"
                        placeholder="Nome">
            </div>
            <button type="submit" class="btn btn-success">Submit</button>
        </form>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data(){
            return {
                email: 'tiago@gmail.com',
                password: '123123'
            }
        },
        methods: {
            async postFB(){
                const {email, password} = this;

                try {
                    const  res = await this.$firebase.auth().signInWithEmailAndPassword(email, password);
                    window.uid = res.user.uid;
                    this.$router.push({name: 'home'});
                }catch (err) {
                    window.console.log(err.code);
                    window.console.log(err.message)
                }
            }
        },
        mounted() {
            this.$firebase.auth().onAuthStateChanged(user => {
                window.uid = user ? user.uid : null;
                this.$router.push({name: window.uid ? 'home' : 'login'});
            })
        },
        beforeRouteEnter(to, from, next){
            next(vm => {
                if (window.uid)
                    vm.$router.push({name: 'home'})
            })
        }
    }
</script>

<style scoped>

</style>
