<template>
    <div v-if="popup.isVisible" id="error">
        <transition name="fade">
            <div class="modal fade show" style="display: block; padding-right: 15px;">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title text-center w-100">{{popup.title}}</h5>
                            <button @click="closePopup" type="button" class="close" data-dismiss="modal" aria-label="Fechar">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <h5>{{popup.text}}</h5>
                        </div>
                        <div class="modal-footer">
                            <button @click="closePopup" type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
                        </div>
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
        name: "PopupError",
        props: {
            popup: {
                isVisible: false,
                title: '',
                text: ''
            }
        },
        methods: {
            closePopup: function () {
                this.popup.isVisible = false;
            }
        }
    }
</script>

<style scoped>

</style>