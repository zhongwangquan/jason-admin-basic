export default {
    state: {
        collapse: false,
        menuTree: {},
        menuRouteLoaded: false
    },
    actions: {
        collapse({ commit }) {
            commit('collapse')
        },
        menuTree({ commit }, payload) {
            let action = {
                type: 'menuTree',
                payload
            }
            commit(action)
        },
        menuRouteLoaded({ commit }, payload) {
            let action = {
                type: 'menuRouteLoaded',
                payload
            }
            commit(action)
        }
    },
    mutations: {
        collapse(state) {
            state.collapse = !state.collapse
        },
        menuTree(state, action) {

            state.menuTree = action.payload
        },
        menuRouteLoaded(state, action) {

            state.menuRouteLoaded = action.payload
        }
    },
    getters: {
        getCollapse(state){// 对应着上面state
            return state.collapse;
        },    
        getMenuTree(state){// 对应着上面state
            return state.menuTree;
        },
        getMenuRouteLoaded(state){// 对应着上面state
            return state.menuRouteLoaded;
        }
    },
    namespaced: true
}
