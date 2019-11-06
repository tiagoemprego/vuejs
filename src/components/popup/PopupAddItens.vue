<template>
    <div id="include">
        <transition name="fade">
            <div v-if="popup.isVisible" class="modal fade show" style="display: block; padding-right: 15px;">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <form @submit.prevent="insert" action="">
                            <div class="modal-header">
                                <h5 class="modal-title text-center w-100">Título do modal</h5>
                                <button @click="closePopup" type="button" class="close" data-dismiss="modal" aria-label="Fechar">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <div class="row">
                                    <div class="col-9">
                                        <div class="form-group">
                                            <label for="title">Titulo</label>
                                            <input type="text"
                                                   v-model="form.title"
                                                   required
                                                   class="form-control"
                                                   id="title"
                                                   placeholder="Descrição">
                                        </div>
                                    </div>
                                    <div class="col-3 pl-0">
                                        <div class="form-group">
                                            <label for="value">Valor</label>
                                            <input type="text"
                                                   v-model="form.value"
                                                   required
                                                   class="form-control"
                                                   id="value"
                                                   placeholder="Valor">
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <div class="form-group">
                                            <label for="description">descrição</label>
                                            <input type="text"
                                                   v-model="form.description"
                                                   required
                                                   class="form-control"
                                                   id="description"
                                                   placeholder="Descrição">
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <input type="file"
                                               @change="uploadFile($event)"
                                               ref="inputFile"
                                               accept="image/png,image/jpg,image/png"
                                               class="d-none"
                                               id="archive">
                                        <div class="row no-gutters">
                                            <div class="col-6">
                                                <button @click.prevent="getFile" type="button" class="btn btn-outline-warning">Adicionar comprovante</button>
                                            </div>
                                            <div class="col-6">
                                                <div class="mt-2 text-center" v-if="form.receipt">
                                                    {{form.receipt.name}}
                                                    <a href="#" class="clear" @click.prevent="form.receipt = ''">
                                                        <img src="https://cdn.icon-icons.com/icons2/1791/PNG/128/trashcan1_114647.png" alt="excluir">
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button @click="closePopup" type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
                                <button v-if="disabled ? `disabled` : ''" id="add" class="btn btn-warning">Adicionar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </transition>
        <transition name="fade">
            <div v-if="popup.isVisible" class="modal-backdrop fade show"></div>
        </transition>
    </div>
</template>

<script>
    export default {
        name: "PopupAddItems",
        props:{
            popup: {
                isVisible: false,
            }
        },
        data(){
            return {
                disabled: false,
                form: {
                    title: '',
                    description: '',
                    value: '',
                    receipt: ''
                },
            }
        },
        computed:{
            fileName() {
                const {receipt} = this.form;

                if(receipt){
                    const split = receipt.name.split('.');
                    return `${split[0]}-${new Date().getTime()}.${split[1]}`;
                }else{
                    return '';
                }
            }
        },
        methods: {
            getFile(){
                this.$refs.inputFile.value = '';
                this.$refs.inputFile.click()
            },
            uploadFile({target}) {
                this.form.receipt = target.files[0]
            },
            async insert(){
                let url = '';
                try {
                    this.disabled = true;
                    const ref = this.$firebase.database().ref(`/${window.uid}`);
                    const id = ref.push().key;

                    if (this.form.receipt){
                        const snapshot = this.$firebase.storage()
                            .ref(`/${window.uid}`)
                            .child(this.fileName)
                            .put(this.form.receipt)
                            .then(function(snapshot) {
                                return snapshot.ref.getDownloadURL()
                            });

                        url = await snapshot;
                    }

                    const payload = {
                        id,
                        ...this.form,
                        receipt: url,
                        cratedAt: new Date().getTime(),
                    };

                    ref.child(id).set(payload, err => {
                        if (err)
                            window.console.log(err);
                        else{
                            this.popup.isVisible = false;
                            this.formReset();
                        }
                    })
                }catch (error) {
                    window.console.log(error);
                }finally {
                    this.formReset();
                    this.disabled = false;
                }
            },
            closePopup: function () {
                this.popup.isVisible = false;
                this.formReset();
            },
            formReset: function() {
                this.form.title = '';
                this.form.description = '';
                this.form.value = '';
                this.form.receipt = '';
            }
        }
    }
</script>

<style lang="scss" scoped>
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to{
        opacity: 0;
    }
    .clear{
        position: relative;

        img{
            position: absolute;
            max-width: 20px;
            right: -20px;
            top: -2px;

            &:hover{
                zoom: 1.1;
            }
        }
    }
</style>
