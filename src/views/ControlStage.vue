<template lang="pug">
    .control-stage
        h3 Три взаимодействующих контролла
        form
            fieldset(
                v-for="(control,index) in controls"
                :key="control.id"
            )
                label {{ control.name }}
                Control(
                    v-model="control.value"
                    :ref="'control_' + control.id"
                    :id="control.id"
                    :type="control.type"
                    :tabindex="index + 1"
                    :helper="control.helperName"
                    @helperHandler="handle_func_call(control.helperMethod, index)"
                    @focus="focus(control.id, $event)"
                    @change="getChange(control.value, index)"
                    @input="getChange(control.value, index)"
                    @keyupEnter="keyupEnter(control.value, index, $event)"
                    @keyupEsc="keyupEsc(index, $event)"
                    @keyupTab="keyupTab(index, $event)"
                    @click="onClick(control.id, $event)"
                )

            fieldset
                button(@click.prevent="clearData") ___ RESET ___
</template>

<script>
    // eslint-disable-next-line
    /* eslint-disable */

    import Control from '@/components/Control.vue'

    export default {
        name: 'ControlStage',
        data: () => ({
            tempVal: Number | String
        }),
        components: {
            Control
        },
        methods: {
            documentOnClick(ev) {
                if (!ev.target.classList.contains('input') &&
                    !ev.target.classList.contains('arrow') &&
                    !ev.target.classList.contains('value') &&
                    !ev.target.classList.contains('helper') &&
                    !ev.target.classList.contains('control-wrap')) {
                    for (let name in this.$refs) {
                        if (this.$refs[name][0].inFocus) {
                            this.$store.dispatch('SET_CONTROL_VALUE', {
                                index: this.$refs[name][0].tabindex - 1,
                                value: +this.$refs[name][0].value === 0 ? 0 : +this.$refs[name][0].value.toString().replace(/^0+/, '')
                            }).catch(() => this.error = true);
                            this.$refs[name][0].inFocus = false;
                        }
                    }
                }
            },
            onClick(id, ev) {
                if (!this.$refs['control_' + id][0].inFocus) {
                    for (let name in this.$refs) this.$refs[name][0].inFocus = false;
                    this.$nextTick(() => {
                        this.$refs['control_' + id][0].inFocus = true;
                        this.$nextTick(() => this.$refs['control_' + id][0].$refs['input' + id].focus());
                    });
                }
            },
            keyupEsc(i, ev) {
                this.$store.dispatch('SET_CONTROL_VALUE', {
                    index: i,
                    value: +this.tempVal.toString().replace(/^0+/, '')
                }).catch(() => this.error = true);

                ev.target.blur();

                this.$nextTick(() => {
                    for (let name in this.$refs) this.$refs[name][0].inFocus = false
                });
            },
            keyupEnter(val, i, ev) {
                ev.target.blur();

                this.$store.dispatch('SET_CONTROL_VALUE', {
                    index: i,
                    value: +val === 0 ? 0 : +val.toString().replace(/^0+/, '')
                }).catch(() => this.error = true);

                this.$nextTick(() => {
                    for (let name in this.$refs) this.$refs[name][0].inFocus = false
                });
            },
            keyupTab(i, ev) {
                for (let name in this.$refs) this.$refs[name][0].inFocus = false;

                let nextID = ev.shiftKey ?
                    this.$store.getters.getControlByIndex(+i - 1) ?
                        this.$store.getters.getControlByIndex(+i - 1).id :
                        this.$store.getters.getControlByIndex(this.controls.length - 1).id :
                    this.$store.getters.getControlByIndex(+i + 1) ?
                        this.$store.getters.getControlByIndex(+i + 1).id :
                        this.$store.getters.getControlByIndex(0).id;

                this.$nextTick(() => {

                    this.$refs['control_' + nextID][0].inFocus = true;
                    this.$nextTick(() => this.$refs['control_' + nextID][0].$refs['input' + nextID].focus());
                });
            },
            getChange(val, i) {
                if (i === 1 || i === 2) {
                    this.$store.dispatch('SET_CONTROL_VALUE', {
                        index: +i === 1 ? 2 : 1,
                        value: +val === 0 ? 0 : +val.toString().replace(/^0+/, '')
                    }).catch(() => this.error = true);
                }
            },
            focus(id, ev) {
                this.tempVal = this.$store.getters.getControlById(+id).value;
                ev.target.select();
            },

            getSum() {
                this.$store.dispatch('GET_SUM', [0, 1, 2]).catch(() => this.error = true);
            },
            setConst(i) {
                this.$store.dispatch('SET_CONTROL_VALUE', {
                    index: +i,
                    value: 1000
                }).catch(() => this.error = true);
                this.$nextTick(() => this.getChange(1000, i));
            },

            clearData() {
                this.$store.dispatch('RESET_STATE').catch(() => this.error = true);
            },
            handle_func_call(...args) {
                this[args[0]](...args.slice(1))
            },
        },
        computed: {
            controls: function () {
                return this.$store.state.controls;
            }
        },
        mounted: function () {
            document.addEventListener('click', this.documentOnClick)
        },
        beforeDestroy: function () {
            document.removeEventListener('click', this.documentOnClick)
        }
    }
</script>

<style scoped lang="stylus">
    h3
        margin 40px auto

    fieldset
        display block
        padding: 0
        margin: 0 0 20px
        border: none

    label
        display inline-flex
        text-align: right
        justify-content flex-end
        padding: 6px 10px
        color: #767c82
        vertical-align: top
</style>
