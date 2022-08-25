import { StyleSheet, Text, View, Platform } from 'react-native'
import  React, { createContext, useContext, useEffect, useMemo, useState} from 'react';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';

import { ResponseType } from 'expo-auth-session';
import { auth } from '../firebase';

import { GoogleAuthProvider, signInWithCredential, onAuthStateChanged, signOut } from 'firebase/auth';
import { onSnapshot } from 'firebase/firestore';


WebBrowser.maybeCompleteAuthSession();


const AuthContext = createContext();


export const AuthProvider = ({ children }) => {

const [accessToken, setAccessToken] = useState();
const [userInfo, setUserInfo] = useState();
const [message, setMessage] = useState();
const [user, setUser] = useState(null);
const [loadingInitial, setLoadingInitial] = useState(true);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);



 
const useProxy = Platform.select({ web: false, default: true });

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({

   androidClientId:'140520512004-iic7uc99n0lb1pga78p07e2cduvdljr9.apps.googleusercontent.com',
    
    isoClientId:'140520512004-edhft7qf7cvp0rf28gn5a1vplsjk8hok.apps.googleusercontent.com',
    
    expoClientId:'140520512004-mcjhu605k6rsq1mhnidml92c80dv09ej.apps.googleusercontent.com',
    
    scopes:['profile', 'email'],
    
   //responseType:'id_token',
   responseType: ResponseType.Token,


  });

  useProxy,
 
  useEffect(() => {

    const fetchData = async () => {

     setLoading(true);

      if (response?.type === "success") {

        setMessage(JSON.stringify(response));

       const {id_token} = response.params;

       const {access_token} = response.params;
         
         setAccessToken(response.authentication.accessToken);
          const credential = new GoogleAuthProvider.credential(
          id_token, // Pass the access_token as the second property
          access_token
        );
        
        
        await signInWithCredential(auth, credential);
        
            }


    }

    fetchData()

    .catch((error) => setError(error))
    .finally(() => setLoading(false));


  }, [response]);
   

  useEffect(() => onAuthStateChanged(auth, (user) => {

      if(user){
        
        setUser(user);

      }else{

    setUser(null);

      }
      setLoadingInitial(false);
    }),

     [])






const logout = () => {

      setLoading(true);

      signOut(auth).catch((error) => setError(error)).finally(() => setLoading(false));

     }

  async function getUserData() {
    let userInfoResponse = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: { Authorization: `Bearer ${accessToken}`}

    });

  
    userInfoResponse.json().then(data => {
      setUserInfo(data);
     // console.log(userInfo);
    });
  }
  const memoedValue = useMemo(() => ({

    user,
    
     accessToken,
     getUserData, 
     promptAsync,
     loading,
     error,
     logout
     

  }), 
  [user, loading, error]);



  return (
    
    <AuthContext.Provider value={{

    user,
     userInfo,
     accessToken,
     getUserData, 
     promptAsync,
     loading,
     error,
     logout
     
    
        
    }}>
        {!loadingInitial && children}
    </AuthContext.Provider>

  )
}

export default function useAuth(){

    return useContext(AuthContext);

}