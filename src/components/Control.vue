<template lang="pug">
    .control-wrap(
        :class="{ 'inFocus':inFocus }"
        @click="$emit('click', $event)"
    )
        input(
            :ref="'input' + id"
            :disabled="!inFocus"
            :value="value"
            :type="type"
            :tabIndex="tabindex"
            @input="$emit('input', $event.target.value)"
            @change="$emit('change', $event.target.value)"
            @focus="$emit('focus', $event)"
            @keydown.enter.prevent="$emit('keyupEnter', $event)"
            @keydown.esc.prevent="$emit('keyupEsc', $event)"
            @keydown.tab.prevent="$emit('keyupTab', $event)"
        ).input

        span.value {{ value | splitNumber }}
        span.arrow

        span.helper(
            v-if="helper"
            @click="$emit('helperHandler')"
        ) {{ helper }}
</template>

<script>
    // eslint-disable-next-line
    /* eslint-disable */

    export default {
        name: 'Control',
        data: () => ({
            inFocus: false
        }),
        props: {
            type: String,
            helper: String,
            id: Number | String,
            value: Number | String,
            tabindex: Number | String
        },
        filters: {
            splitNumber: function (value) {
                return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
            }
        },
    }
</script>

<style scoped lang="stylus">
    .control-wrap
        display: inline-flex
        text-align: left
        justify-content flex-start
        position: relative
        height: 45px
        padding: 0 10px 15px
        width: 160px
        align-items center
        cursor: pointer

        &.inFocus
            .input
                visibility visible
                background: #eee
                border-color #777

            .value
                visibility hidden

            .arrow
                visibility hidden

            .helper
                visibility visible

        &:not('.inFocus')
            input[type="number"]::-webkit-outer-spin-button,
            input[type="number"]::-webkit-inner-spin-button
                -webkit-appearance: none
                margin: 0

        &:hover
            .value
                color #5aaff5

    .value
        display inline-block
        font-size 16px
        font-weight: 600
        padding: 1px
        height: 20px
        min-width 10px
        overflow: hidden
        text-overflow ellipsis
        white-space nowrap

    .arrow
        display inline-block
        width: 10px
        height: 10px
        background: url('../assets/logo.png')
        background-repeat: no-repeat
        background-position: center;
        background-size: contain;
        position: relative
        cursor: pointer
        margin-left: 5px

    .helper
        position absolute
        cursor pointer
        bottom: 0
        left: 10px
        color: #5aaff5
        font-size: 12px
        z-index 9
        visibility hidden

    .input
        position: absolute
        visibility hidden
        cursor: pointer
        left: 0
        top: 0
        width: 100%
        padding: 5px 10px
        outline: 0
        background: transparent
        border: 1px solid transparent
        font-size 16px
        font-weight: 600
</style>
