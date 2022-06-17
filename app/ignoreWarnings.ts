import { LogBox } from "react-native";

const ignoreWarns = ["ViewPropTypes will be removed"];
const warn = console.warn;
console.warn = (...arg) => {
	for (let i = 0; i < ignoreWarns.length; i++) {
		if (arg[0].startsWith(ignoreWarns[i])) return;
	}
	warn(...arg);
};

LogBox.ignoreLogs(ignoreWarns);
