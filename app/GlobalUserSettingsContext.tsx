import { CountryCallingCode, CountryCode } from 'libphonenumber-js';
import create from 'zustand'
import { LoginType } from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';

type GlobalUserSettingsContext = {
    userPhone: string,
    setUserPhone: (val: string) => void,
    userEmail: string,
    setUserEmail: (val: string) => void,
    countryCode: CountryCode,
    setCountryCode: (val: CountryCode) => void,
    countryCallingCode: string,
    setCountryCallingCode: (val: CountryCallingCode) => void,
    authType: LoginType,
    setAuthType: (val: LoginType) => void,
    language?: string,
    setLanguage?: (val: string) => void
}

export const useStore = create<GlobalUserSettingsContext>(set => ({
    userPhone: '',
    userEmail: '',
    countryCode: 'US',
    countryCallingCode: '1',
    authType: LoginType.PHONE,
    language: 'en',
    setUserPhone: (phoneNumber: string) => set({ userPhone: phoneNumber }),
    setUserEmail: (email: string) => set({ userEmail: email }),
    setCountryCode: (countryCode: CountryCode) => set({ countryCode }),
    setCountryCallingCode: (countryCallingCode: CountryCallingCode) => set({ countryCallingCode }),
    setAuthType: (authType: LoginType) => set({ authType }),
    setLanguage: (language: string) => set({ language }),
    deleteEverything: () => set({}, true), // clears the entire store, actions included
}))


type LoggedInUser = {
    currentUserID: string,
    setCurrentUserID: (userID: string) => void,
    currentApplicationStatus: string,
    setApplicatinStatus: (newStatus: string) => void
}

export const useAuthenticatedStore = create<LoggedInUser>(set => ({
    currentUserID: '',
    setCurrentUserID: (userID: string) => set({ currentUserID: userID }),
    currentApplicationStatus: 'Not Started',
    setApplicatinStatus: (newStatus: string) => {
        set({ currentApplicationStatus: newStatus })
    },
}))

export const storeDataAsyncStorage = async (key: string, value: any) => {
    try {
        typeof value === 'string' ? await AsyncStorage.setItem(key, value) : await AsyncStorage.setItem(key, JSON.stringify(value))
    } catch (e) {
        console.log('Error saving to async storage ' + e)
    }
}

export const getDataAsyncStorage = async (key: string) => {
    try {
        const value = await AsyncStorage.getItem(key)
        if (value !== null) {
            return typeof value === 'string' ? value : JSON.parse(value)
        }
    } catch (e) {
        console.log('Error getting value from async storage ' + e)
    }
}
