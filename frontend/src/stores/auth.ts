import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  type User,
} from 'firebase/auth'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { auth, db } from '@/lib/firebase'

export const useAuthStore = defineStore('auth', () => {
  const user       = ref<User | null>(null)
  const isLoggedIn = ref(false)
  const ready      = ref(false)

  onAuthStateChanged(auth, (firebaseUser) => {
    user.value       = firebaseUser
    isLoggedIn.value = !!firebaseUser
    ready.value      = true
  })

  async function login(email: string, password: string) {
    const cred = await signInWithEmailAndPassword(auth, email, password)
    user.value       = cred.user
    isLoggedIn.value = true
  }

  async function signup(email: string, password: string, name: string) {
    const cred = await createUserWithEmailAndPassword(auth, email, password)
    user.value       = cred.user
    isLoggedIn.value = true

    // Write user profile to Firestore
    await setDoc(doc(db, 'users', cred.user.uid), {
      uid:       cred.user.uid,
      name,
      email,
      createdAt: serverTimestamp(),
    })
  }

  async function logout() {
    await signOut(auth)
    user.value       = null
    isLoggedIn.value = false
  }

  return { user, isLoggedIn, ready, login, signup, logout }
})
