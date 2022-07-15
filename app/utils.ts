import React from "react";
import validator from "validator";
import {
	parsePhoneNumber,
	isValidNumberForRegion,
	CountryCode,
	getCountryCallingCode,
	parseNumber,
	parsePhoneNumberWithError,
	ParseError,
	isPossiblePhoneNumber,
	validatePhoneNumberLength,
} from "libphonenumber-js";
import { isValidEmail } from "./styles/styles";

export const phoneValidation = (phone: string, region: CountryCode): string => {
	try {
		parsePhoneNumberWithError(phone, region);
		const checkLength = validatePhoneNumberLength(phone, region);
		const validPhoneNumber = isValidNumberForRegion(phone, region);
		return checkLength
			? checkLength
			: validPhoneNumber
			? ""
			: "Please enter a valid phone number";
	} catch (e) {
		const parseError = (e as ParseError).message;

		return parseError;
	}
};

export const emailValidation = (email: string) => {
	return isValidEmail(email);
};

export const addressValidation = (address: string) => {
	//use smarty or other address validator
	return true;
};

export const postalCodeValidation = (
	postalCode: string,
	region: CountryCode
) => {
	//check if validator.PostalCodeLocale has region
	return validator.isPostalCode(
		postalCode,
		region as validator.PostalCodeLocale
	);
};

export const passportValidation = (passport: string, region: CountryCode) => {
	return validator.isPassportNumber(passport, region);
};
