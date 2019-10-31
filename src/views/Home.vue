<template>
    <div class="container py-5 px-0">
        <div class="btn-add">
            <a @click.prevent="popup.isVisible = true" class="btn btn-warning" href="#">Adicionar</a>
        </div>
        <div class="row no-gutters p-0 mt-3">
            <div v-if="loader" class="col-12 pl-5">
                <img src="../assets/images/loader.gif" alt="loader" width="20px"/>
            </div>
            <div v-else v-for="ele in itemsSaved" :key="ele.id" class="card" style="width: 18rem;">
                <div class="card-body">
                    <a @click.prevent="trashItem(ele.id)" href="#" class="trash">X</a>
                    <h5 class="card-title">{{ele.id}}</h5>
                    <p class="card-text">{{ele.description}}</p>
                    <h6 class="card-subtitle mb-2 text-muted">R$ {{ele.value}}</h6>
                    <p class="text-right">{{helpers.transformTime(ele.cratedAt).split(' ')[2]}}/{{helpers.transformTime(ele.cratedAt).split(' ')[3]}}</p>
                </div>
            </div>
        </div>
        <PopupIncludes :popup="popup"/>
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
                loader: true,
                popup: {isVisible: false},
                itemsSaved: [],
            }
        },
        methods: {
            async getData(){
                this.itemsSaved = [];
                let self = this;
                let array = [];
                let playersRef = this.$firebase.database().ref("pHF74f13t8hFy8X6DYDf5w3X4dh1");

                await playersRef.on("child_added", function(data) {
                    let newPlayer = data.val();
                    array.push(newPlayer);
                    self.loader = (array.length === 0)
                });
                this.itemsSaved = array;
            },
            trashItem(ref) {
                window.console.log(ref);
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

    .card{
        border-radius: 0;

        .trash{
            font-weight: bold;
            color: white;
            padding: 3px 6px;
            background-color: black;
            border-radius: 50%;
            text-decoration: none;

            &:hover{
                background-color: red;
            }
        }
    }
</style>
