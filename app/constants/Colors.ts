import { DarkTheme, DefaultTheme } from "@react-navigation/native";
const tintColorLight = "#2f95dc";
const tintColorDark = "#fff";

export default {
	light: {
		...DefaultTheme.colors,
		primary: "#1C7192",
		secondary: "#90a4ae",
		warning: "#F39D6B",
		pending: "#E7D473",
		error: "#D75A4A",
		focused: "goldenrod",
		success: "#3EB593",
		default: "#000",
		divider: "rgba(0, 0, 0, 0.4)",
		anti: "#fff",
		background: "#fafafa",
		tint: tintColorLight,
		tabIconDefault: "#ccc",
		tabIconSelected: tintColorLight,
	},
	dark: {
		...DarkTheme.colors,
		primary: "#81b29a",
		secondary: "#b44a3f",
		warning: "#F39D6B",
		pending: "#E7D473",
		error: "red",
		focused: "goldenrod",
		success: "green",
		default: "#fff",
		anti: "#000",
		background: "black",
		divider: "rgba(255, 255, 255, 0.12)",
		tint: tintColorDark,
		tabIconDefault: "#ccc",
		tabIconSelected: tintColorDark,
	},
};
