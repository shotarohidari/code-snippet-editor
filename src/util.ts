import { AssertString } from "./types"

export const checkEnvironmentVariable = (variable: object) => {
  const val = Object.values(variable)[0]
  if (!val) {
    throw new Error(
      `環境変数${getVariableName(variable)}がセットされていません`
    )
  }
}

export const getVariableName = (variable: object) => {
//   console.log({variable});
  return Object.keys(variable)[0]
}
