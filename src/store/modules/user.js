import {getInfo, login} from "@/api/user";
import {getToken,setToken,removeToken} from "@/utils/auth";


const  state ={
    token:getToken(),
    name:'',
    roles:[]
}

const  mutations = {
    SET_TOKEN:(state,token) =>{
        state.token = token
    },
    SET_ROLES: (state, roles) => {
        state.roles = roles
    }

}

const  actions = {
    login({commit}, userInfo) {
        const {name, password} = userInfo
        return new Promise((resolve, reject) => {
            login({name: name.trim(), password: password}).then(response => {
                const data = response
                // // eslint-disable-next-line no-debugger
                // debugger
                commit('SET_TOKEN', data.result) //data.result是后端传回的信息
                setToken(data.result)
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
    getInfo({ commit, state }) {
        return new Promise((resolve, reject) => {
            getInfo(state.token).then(response => {
                const  data  = response

                if (!data) {
                    reject('Verification failed, please Login again.')
                }

                // // eslint-disable-next-line no-debugger
                // debugger
                const  {roles} = data.result

                // roles must be a non-empty array
                if (!roles || roles.length <= 0) {
                    reject('getInfo: roles must be a non-null array!')
                }
                commit('SET_ROLES', roles)
                resolve(roles)
            }).catch(error => {
                reject(error)
            })
        })
    },
    resetToken({commit}){
        return new Promise(resolve => {
            commit('SET_TOKEN','')
            removeToken()
            resolve()
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
