<template>
    <div>
        <form>
            <div class="form-group">
                <label for="name">Nome</label>
                <input v-model="user.name" type="text" class="form-control" id="name" placeholder="Nome">
            </div>
            <div class="form-group">
                <label for="email">Email</label>
                <input v-model="user.email" type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Email">
            </div>
            <button @click.prevent="postFB" type="submit" class="btn btn-success">Submit</button>
        </form>
    </div>
</template>

<script>
    export default {
        name: "Firebase",
        data(){
            return {
                user: {
                    name: '',
                    email: ''
                }
            }
        },
        mounted(){
            this.getFB();
        },
        methods: {
            postFB(){
                window.console.log(this.$firebase);
            },
            getFB(){

            }
        }
    }
</script>

<style scoped>

</style>
