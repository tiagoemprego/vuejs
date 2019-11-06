<template>
    <div class="container py-5 px-0">
        <div class="btn-add">
            <a @click.prevent="popup.isVisible = true" class="btn btn-warning" href="#">Adicionar</a>
        </div>
        <div class="row no-gutters p-0 mt-3">
            <div v-if="loader" class="col-12 pl-5">
                <img src="../assets/images/loader.gif" alt="loader" width="20px"/>
            </div>
            <div v-else v-for="ele in itemsSaved" :key="ele.id" class="card mr-2" style="width: 18rem;">
                <a @click.prevent="deleteItem(ele.id)" href="#" class="trash">X</a>
                <img v-if="ele.receipt" :src="ele.receipt" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">{{ele.title}}</h5>
                    <p class="card-text">{{ele.description}}</p>
                    <div class="row no-gutters">
                        <div class="col-6">
                            <h6 class="text-muted m-0">R$ {{ele.value}}</h6>
                        </div>
                        <div class="col-6 text-right">
                            <div class="date" v-date-format="ele.cratedAt" />
                        </div>
                    </div>
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
            getData(){
                let ref = this.$firebase.database().ref("pHF74f13t8hFy8X6DYDf5w3X4dh1");

                ref.on('value', data => {
                    const values = data.val();
                    if (values)
                    {
                        this.itemsSaved = Object.keys(values).map(i => values[i]);
                        this.loader = (this.itemsSaved.length === 0)
                    }
                })
            },
            deleteItem(ref) {
                let adaRef = this.$firebase.database().ref("pHF74f13t8hFy8X6DYDf5w3X4dh1");
                adaRef.child(ref).remove()
                    .then(() => {
                        window.console.log("Remove succeeded!");
                        this.$firebase.storage()
                            .ref(`/${window.uid}`).child(ref).remove()
                            .then(()=> window.console.log('Removed image!'))
                            .catch(error => window.console.log(error))
                    })
                    .catch(error => {
                        window.console.log("Remove failed: " + error.message)
                    });
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
        box-shadow: 0 0 5px rgba(0,0,0,.3);
        border: 0;

        &-body{
            padding-top: 20px;
        }

        .trash{
            font-weight: bold;
            color: white;
            padding: 0 6px;
            background-color: black;
            box-shadow: 0 0 5px #000000;
            border-radius: 50%;
            text-decoration: none;
            position: absolute;
            right: 5px;
            top: 5px;

            &:hover{
                background-color: red;
                box-shadow: 0 0 5px red;
            }
        }

    }
        .date{
            a{
                margin: 0;
            }

            small{
                font-size: 10px;
            }
        }
</style>
