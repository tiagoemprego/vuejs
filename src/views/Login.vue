<template>
    <div id="form-register">
        <div v-if="errors.length">
            <b>Por favor, corrija o(s) seguinte(s) erro(s):</b>
            <ul>
                <li v-for="error in errors" :key="error.id">{{ error }}</li>
            </ul>
        </div>
        <form @submit.prevent="checkForm">
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
                <label for="password">Senha</label>
                <input
                        id="password"
                        v-model="password"
                        type="password"
                        class="form-control"
                        placeholder="Nome">
            </div>
            <button type="submit" class="btn btn-success">Submit</button>
        </form>
        <PopupError :popup="popup"/>
    </div>
</template>

<script>
    import PopupError from '@/components/popup/PopupError.vue';

    export default {
        name: "Login",
        components: {
            PopupError
        },
        data(){
            return {
                email: 'tiago@gmail.com',
                password: '123123',
                errors: [],
                popup: {
                    isVisible: false,
                    title: '',
                    text: ''
                }
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
                    window.console.log(err.message);

                    this.popup.isVisible = true;
                    this.popup.title = err.code;
                    this.popup.text = err.message;
                }
            },
            checkForm: function () {
                this.errors = [];
                if (!this.email) {
                    this.errors.push('O e-mail é obrigatório.');
                } else if (!this.validEmail(this.email)) {
                    this.errors.push('Utilize um e-mail válido.');
                }

                if (!this.errors.length)
                    this.postFB();
            },
            validEmail: function (email) {
                const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(email);
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
