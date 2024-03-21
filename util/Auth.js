import axios from "axios"

const BASE_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:'
const API_KEY = 'AIzaSyDDyXceRHLBSu2cbxmsgusahIFgtNSNMSU'

async function authenticateUser(mode, email, password) {
    const response = await axios.post(`${BASE_URL}${mode}?key=${API_KEY}`,
        {
          email: email,
          password: password,
          returnSecureToken: true
        }
      );

      return response.data.idToken
}

export function createUser(email, password)
{
    return authenticateUser('signUp', email, password)
}

export function login(email, password)
{
    return authenticateUser('signInWithPassword', email, password)
}