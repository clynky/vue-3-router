import store from '@/store'
import { googleOneTap } from "vue3-google-login"
import { decodeCredential } from 'vue3-google-login'
import { googleTokenLogin } from "vue3-google-login"

class AuthService{

    async login():Promise<boolean> {
        // const response= await   googleTokenLogin();
        // // const response= await  googleOneTap()
        // console.log('onetapresponse',response)
        //   const userData = decodeCredential(response.access_token)
        //   console.log('userData',userData)

        // store.commit('setUser', userData)
        //  return true;
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
        localStorage.commit('logout');
    }

    isLoggedIn(): boolean {
        return store.getters.isLoggedIn;
    }
}

export const authService = new AuthService();