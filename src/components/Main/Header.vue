<template>
    <div class="header py-4">
        <ul class="list-group d-flex flex-row">
            <li class="list-group-item"><router-link :to="{name: 'home'}">Home</router-link></li>
            <li class="list-group-item ml-3"><router-link :to="{name: 'firebase'}">Firebase</router-link></li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "Header"
    }
</script>

<style lang="scss" scoped>

</style>
