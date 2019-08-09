import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const initialState = () => {
    return {
        controls: [
            {
                id: 1,
                name: 'Контролл 1',
                type: 'number',
                value: 0,
                helperName: 'Сумма',
                helperMethod: 'getSum'
            },
            {
                id: 2,
                name: 'Контролл 2',
                type: 'number',
                value: 0,
                helperName: 'Константа',
                helperMethod: 'setConst'
            },
            {
                id: 3,
                name: 'Контролл 3',
                type: 'number',
                value: 0
            }
        ]
    }
};
const state = initialState();

export default new Vuex.Store({
    state,
    getters: {
        getControlById: state => id => {
            return state.controls.find(c => c.id === id);
        },
        getControlByIndex: state => index => {
            return state.controls[index];
        }
    },
    actions: {
        RESET_STATE(context) {
            context.commit('resetState');
        },
        GET_SUM(context, data) {
            context.commit('getSum', data);
        },
        UPDATE_CONTROLS(context, data) {
            context.commit('updateControls', data);
        },
        SET_CONTROL_VALUE(context, data) {
            context.commit('setControlValue', data);
        },
    },
    mutations: {
        resetState: function (state) {
            Object.assign(state, initialState());
        },
        getSum: function (state, payload) {
            state.controls[payload[0]].value = +state.controls[payload[1]].value + +state.controls[payload[2]].value;
        },
        updateControls: function (state, payload) {
            state.controls = payload;
        },
        setControlValue: function (state, payload) {
            state.controls[payload.index].value = payload.value;
        },
    }
})
