import { CountryCallingCode, CountryCode } from 'libphonenumber-js';
import React, { Component, createContext, ReactChildren, ReactNode, useState } from "react";
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

}
export const initialGlobalContext = {
    userEmail: '',
    userPhone: '',
    countryCode: 'US',
    countryCallingCode: '1',
    authType: LoginType.PHONE,
    language: 'en',
}


export const ColorContext = createContext({} as GlobalUserSettingsContext);
