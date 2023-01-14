export type CodeSnippetData = {
    id:string,
    created_date: string, 
    title:string
    code: string,
}

export type AssertString = (value: unknown) => asserts value is string