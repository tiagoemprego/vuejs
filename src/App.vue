<template>
  <div id="app">
    <div class="container">
      <my-header />
      <router-view/>
      <my-footer/>

    </div>
  </div>
</template>

<script>
  import MyFooter from '@/components/Main/Footer.vue';
  import MyHeader from '@/components/Main/Header.vue';

  export default {
    components: {
      MyFooter,
      MyHeader,
    }
  }
</script>
