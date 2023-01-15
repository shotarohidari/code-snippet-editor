import {expect,describe,test} from "vitest";
import {getVariableName,checkEnvironmentVariable, changeDateFormat} from "../src/util";
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
describe("extractDate", () => {
    test("文字列で表現された日時を年/月/日 dd:ddに変換できる", () => {
        const strDate = "2023-01-04T00:09:56.197Z";
        expect(changeDateFormat(strDate)).toBe("2023/01/04 00:09");
    });
})