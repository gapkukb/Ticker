import typescript from "rollup-plugin-typescript2";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import { babel } from "@rollup/plugin-babel";
import { terser } from "rollup-plugin-terser";
import pkg from "./package.json";
export default {
	input: "src/index.ts", // 入口文件
	output: {
		name: "Ticker", // umd 模式必须要有 name  此属性作为全局变量访问打包结果
		file: pkg.browser,
		format: "umd",
		sourcemap: true,
	},
	plugins: [
		resolve(), // 查找和打包node_modules中的第三方模块
		commonjs(), // 将 CommonJS 转换成 ES2015 模块供 Rollup 处理
		babel({
			extensions: [".js", ".ts"],
			exclude: "node_modules/**",
			babelHelpers: "bundled",
		}),
		typescript({
			tsconfigOverride: {
				compilerOptions: {
					declaration: false, // 输出时去除类型文件
				},
			},
		}),
		terser(),
	],
};
