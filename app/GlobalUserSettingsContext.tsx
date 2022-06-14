import { CountryCallingCode, CountryCode } from 'libphonenumber-js';
import create from 'zustand'
import { LoginType } from './types';

interface GlobalUserSettingsContext {
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
    realm: Realm
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
    realm: {} as Realm
}))
