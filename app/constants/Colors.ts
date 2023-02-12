import { DarkTheme, DefaultTheme } from "@react-navigation/native";
const tintColorLight = "#2f95dc";
const tintColorDark = "#fff";

export default {
	light: {
		...DefaultTheme.colors,
		primary: "#1c7192",
		secondary: "#90a4ae",
		warning: "#9B3B03",
		pending: "#7B6C21",
		error: "#A51704",
		focused: "goldenrod",
		success: "#005D43",
		default: "#000",
		divider: "rgba(0, 0, 0, 0.4)",
		anti: "#fff",
		background: "#fafafa",
		tint: "rgba(0, 0, 0, 0.4)",
		tabIconDefault: "#ccc",
		tabIconSelected: tintColorLight,
	},
	dark: {
		...DarkTheme.colors,
		primary: "#4db6ac",
		secondary: "#b44a3f",
		warning: "#F39D6B",
		pending: "#E7D473",
		error: "#F89E92",
		focused: "goldenrod",
		success: "#20D19F",
		default: "#fff",
		anti: "#000",
		background: "#2A2828",
		divider: "rgba(255, 255, 255, 0.12)",
		tint: tintColorDark,
		tabIconDefault: "#ccc",
		tabIconSelected: tintColorDark,
	},
};
