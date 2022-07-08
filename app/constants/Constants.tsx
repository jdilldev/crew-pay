import React from "react";
import { Dimensions } from "react-native";
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
