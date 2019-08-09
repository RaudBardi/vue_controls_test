<template lang="pug">
    #app
        ControlStage
</template>

<script>
    import ControlStage from '@/views/ControlStage.vue'

    export default {
        name: 'app',
        components: {
            ControlStage
        }
    }
</script>
<style lang="stylus">
    * {
        box-sizing: border-box;
    }

    #app
        font-family 'Avenir', Helvetica, Arial, sans-serif
        -webkit-font-smoothing antialiased
        -moz-osx-font-smoothing grayscale
        text-align center
        color #2c3e50
        margin-top 60px
</style>
