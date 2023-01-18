export const checkEnvironmentVariable = (variable: Record<string,unknown>) => {
  const val = Object.values(variable)[0]
  if (!val) {
    throw new Error(
      `環境変数${getVariableName(variable)}がセットされていません`
    )
  }
}

export const getVariableName = (variable: object) => {
  return Object.keys(variable)[0]
}


export const changeDateFormat = (strDate:string) => {
    const ISORegex = /(?<years>\d{4})-(?<months>\d{2})-(?<days>\d{2})T(?<hours>\d{2}):(?<minutes>\d{2}):(?<seconds>\d{2})/
    const match = strDate.match(ISORegex)
    if(!match) throw new Error("有効な形式ではありません");
    const {groups} = match;
    return `${groups?.years}/${groups?.months}/${groups?.days} ${Number(groups?.hours) + 9}:${groups?.minutes}`
}