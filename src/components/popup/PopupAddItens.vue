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
                                            <label for="description">descrição</label>
                                            <input type="text"
                                                   v-model="form.description"
                                                   required
                                                   class="form-control"
                                                   id="description"
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
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button @click="closePopup" type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
                                <button class="btn btn-warning">Adicionar</button>
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
                isVisible: true,
            }
        },
        data(){
            return {
                form: {
                    description: '',
                    value: ''
                }
            }
        },
        methods: {
            async insert(){
                const ref = this.$firebase.database().ref(window.uid);
                const id = ref.push().key;

                const payload = {
                    id,
                    receipt: '',
                    value: this.form.value,
                    cratedAt: new Date().getTime(),
                    description: this.form.description
                };

                ref.child(id).set(payload, err => {
                    if (err)
                        window.console.log(err);
                    else
                        this.popup.isVisible = false;
                })
            },
            closePopup: function () {
                this.popup.isVisible = false;
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
</style>