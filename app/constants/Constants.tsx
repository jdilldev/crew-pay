import React from "react";
import { Dimensions } from "react-native";
import { TextThemeProps } from '../styles/Interfaces';

export const endpoint = "http://localhost:3002";

export const COUNTRY_DATA = [
	{
		id: "US",
		title: "United States",
		image: require("../assets/flags/us.png"),
	},
	{
		id: "GB",
		title: "United Kingdom",
		image: require("../assets/flags/gb.png"),
	},
	{
		id: "CA",
		title: "Canada",
		image: require("../assets/flags/ca.png"),
	},
	{
		id: "AU",
		title: "Australia",
		image: require("../assets/flags/au.png"),
	},
].sort((a, b) => a.title.localeCompare(b.title));

export const DEVICE_WIDTH = Dimensions.get("window").width;
export const DEVICE_HEIGHT = Dimensions.get("window").height;
export const MAX_CHARS_GROUP_NAME = 26

export const APPLICATION_STATUS: { [name: string]: { text: string, icon: string, type: TextThemeProps['type'] } } = {
	'AwaitingDocuments': { text: 'Awaiting Documents', icon: 'warning-outlined', type: 'warning' },
	'PendingReview': { text: 'Pending Review', icon: 'pending', type: 'pending' },
	'Pending': { text: 'Pending', icon: 'pending', type: 'pending' },
	'Approved': { text: 'Approved', icon: 'check-outlined', type: 'success' },
	'Denied': { text: 'Denied', icon: 'cancel-outlined', type: 'error' },
	'Uninitiated': { text: 'Not Started', icon: 'minus-outlined', type: 'divider' },
	'Loading': { text: '', icon: '', type: 'primary' }
}