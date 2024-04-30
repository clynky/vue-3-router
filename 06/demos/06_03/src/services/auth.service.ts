import store from '@/store'
import { googleOneTap } from "vue3-google-login"
import { decodeCredential } from 'vue3-google-login'
import { googleTokenLogin } from "vue3-google-login"
import { googleLogout } from "vue3-google-login"

class AuthService{

    async login():Promise<boolean> {
       
      try{
        const response= await  googleOneTap()
        console.log('g-reponse',response)
        this.processGoogleOneTapResponse(response)
        return true;
      }
      catch{
        return false
      }
    }
    processGoogleOneTapResponse(response: {credential:string}): void {
        const userData = decodeCredential(response.credential)
        store.commit('setUser', userData)
    }
    logout(): void {
      
        googleLogout()
        store.commit('logout')
    }

    isLoggedIn(): boolean {
        return store.getters.isLoggedIn;
    }
}

export const authService = new AuthService();