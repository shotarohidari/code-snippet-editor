import {expect,describe,test} from "vitest";
import {getVariableName,checkEnvironmentVariable} from "../src/util";
describe("getVariableName", () => {
    test("変数名を取得できる", () => {
        const variableName = "Hello, World!";
        expect(getVariableName({variableName})).toBe("variableName");
    });
})
describe("checkEnvironmentVariable", () => {
    test("環境変数に値が入っているかチェック", () => {
        const MODE = "production";
        expect(checkEnvironmentVariable({MODE})).toBe(undefined)
    });
    test("環境変数が空、undefinedだったらエラー", () => {
        const MODE = "";
        expect(() => checkEnvironmentVariable({MODE})).toThrow(`環境変数MODEがセットされていません`);

        const API_ENDPOINT = undefined;
        expect(() => checkEnvironmentVariable({API_ENDPOINT})).toThrow(`環境変数API_ENDPOINTがセットされていません`);
    });
})