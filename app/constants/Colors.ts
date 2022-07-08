import { DarkTheme, DefaultTheme } from "@react-navigation/native";
const tintColorLight = "#2f95dc";
const tintColorDark = "#fff";

export default {
	light: {
		...DefaultTheme.colors,
		primary: "#118ab2",
		secondary: "slategray",
		warning: "red",
		error: "#D75A4A",
		focused: "goldenrod",
		success: "green",
		default: "#000",
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
		warning: "red",
		error: "red",
		focused: "goldenrod",
		success: "green",
		default: "#fff",
		anti: "#000",
		background: "black",
		tint: tintColorDark,
		tabIconDefault: "#ccc",
		tabIconSelected: tintColorDark,
	},
};
