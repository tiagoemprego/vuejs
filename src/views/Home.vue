<template>
    <div class="container py-5">
        <form class="form-inline my-3">
            <label class="sr-only" for="username">Name</label>
            <input class="form-control mr-sm-2"
                   id="username"
                   v-model="username"
                   type="text"
                   placeholder="github username">

            <label class="sr-only" for="repository">Username</label>

            <div class="input-group mr-sm-2">
                <input class="form-control"
                       id="repository"
                       v-model="repository"
                       type="text"
                         placeholder="repositorio">
            </div>

            <button @click.stop.prevent="getElements" type="submit" class="btn btn-success mr-2">Buscar</button>
            <button @click.prevent="reset()" type="submit" class="btn btn-danger">resetar</button>
        </form>

        <template v-if="selectIssue.id">
            <div class="card" style="width: 18rem;">
                <div class="card-body">
                    <img :src="selectIssue.user.avatar_url" alt="avatar"/>
                    <h5 class="card-title pt-3" >{{selectIssue.title}}</h5>
                    <!--<p class="card-text">{{selectIssue.body}}</p>-->
                    <a href="" @click.prevent="clear()" class="btn btn-primary">Voltar</a>
                </div>
            </div>
        </template>

        <div v-if="!selectIssue.id">
            <div class="row">
                <div v-if="loader.getLoad" class="col-12 pl-5 ml-5">
                    <img src="../assets/images/loader.gif" alt="loader" width="20px"/>
                </div>
            </div>
            <h3 v-if="elements.length<1 && !loader.getLoad">Nenhum elemento</h3>
            <div v-else>
                <div v-for="issue in elements" :key="issue.id" class="row no-gutters p-2 border">
                    <div class="col-1">
                        <a @click.prevent.stop="getElementsInternal(issue)" href="">
                            {{issue.number}}
                            <img v-if="issue.is_loader" src="../assets/images/loader.gif" alt="loader" width="20px"/>
                        </a>
                    </div>
                    <div class="col-11">
                        {{issue.title}}
                    </div>
                </div>
            </div>
        </div>

        <PopupIncludes :popup="popup"/>

        <div class="row">
            <div v-for="ele in itensSaved" :key="ele.id" class="card" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">{{ele.id}}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">{{ele.value}}</h6>
                    <p class="card-text">{{ele.description}}</p>
                    <p>{{helpers.transformTime(ele.cratedAt)}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import PopupIncludes from '@/components/popup/PopupAddItens.vue';
    import helpers from '../helpers';
    export default {
        name: "Home",
        components: {
            PopupIncludes,
        },
        data(){
            return{
                helpers: helpers,
                username: 'vuejs',
                repository: 'vue',
                elements: [],
                selectIssue: {},
                loader:{
                    getLoad: false,
                    getIssue: false
                },
                popup: {
                    isVisible: true,
                },
                itensSaved: [],
            }
        },
        methods: {
            reset(){
                this.username = '';
                this.repository = '';
                this.elements = [];

            },
            getElements(){
                this.loader.getLoad = true;
                if (this.username && this.repository){
                    const url = `http://api.github.com/repos/${this.username}/${this.repository}/issues`;
                    this.$http.get(url).then((response)=> {
                        this.elements = response.data;
                        this.loader.getLoad = false;
                    })
                }
            },
            getElementsInternal(issue){
                this.$set(issue, 'is_loader', true);
                if (this.username && this.repository){
                    const url = `http://api.github.com/repos/${this.username}/${this.repository}/issues/${issue.number}`;
                    this.$http.get(url).then((response)=> {
                        this.selectIssue = response.data;
                        this.loader.getIssue = false;
                        this.$set(issue, 'is_loader', false);
                    })
                }
            },
            clear(){
                this.selectIssue = {}
            },
            async getData(){
                this.itensSaved = [];
                let array = [];
                let playersRef = this.$firebase.database().ref("pHF74f13t8hFy8X6DYDf5w3X4dh1");

                await playersRef.on("child_added", function(data) {
                    let newPlayer = data.val();
                    array.push(newPlayer);
                });

                this.itensSaved = array;
                window.console.log(this.itensSaved);
            }
        },
        mounted() {
            this.getData();
            this.$firebase.auth().onAuthStateChanged(user => {
                window.uid = user ? user.uid : null;
                this.$router.push({name: window.uid ? 'home' : 'login'});
            })
        }
    }
</script>

<style lang="scss" scoped>
    form{
        input{
            border: 2px solid #000;
        }
    }

    .row{
        padding: 3px;
    }

    img{
        max-width: 100%;
    }
</style>
