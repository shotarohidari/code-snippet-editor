import { Form, LoaderFunctionArgs, useLoaderData,useFetcher, ActionFunctionArgs, useMatch } from "react-router-dom"
import { getContact,updateContact } from "../contacts"
import { VITE_API_ENDPOINT } from "../environmentvariables"
import { CodeSnippetData } from "../types"
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { changeDateFormat } from "../util";
import { useEffect, useState } from "react";
import { Box, Button, TextField } from "@mui/material";

export type ContactData = {
  favorite: boolean
  avatar: string
  first: string
  last: string
  twitter: string
  notes: string
}
const getCodeSnippet = async (id:string):Promise<CodeSnippetData> => {
  const res = await fetch(`${VITE_API_ENDPOINT}/snippets/${id}`);
  const data = await res.json() as CodeSnippetData;
  return data
}
// 個別データを取得
export async function loader({ params }: LoaderFunctionArgs) {
    const codeSnippetData = await getCodeSnippet(params.id || "");
    if (!codeSnippetData) {
        throw new Response("", {
          status: 404,
          statusText: "Not Found",
        });
    }
  return codeSnippetData
}

export async function action({ request, params }:ActionFunctionArgs) {
    const id = params.id || "";
    const formData = await request.formData();
    const code = formData.get("code");
    const title = formData.get("title");
    console.log({code,title});
    try {
      await fetch(`${VITE_API_ENDPOINT}/snippets/${id}/edit`,{method:"PATCH",body:JSON.stringify({
        code,
        title
      }),headers:{
        "Content-Type":"application/json"
      }});
      const res = await fetch(`${VITE_API_ENDPOINT}/snippets/${id}`);
      const data = await res.json();
      console.log({data});
      return data;
    } catch(e) {
      throw new Response("Internal ServerError",{
        status:500
      });
    }
  }
export default function Detail() {
  const match = useMatch("/:id");
  const id = match?.params.id;
  const codeSnippetData = useLoaderData() as CodeSnippetData;
  const [title,setTitle] = useState(codeSnippetData.title);
  const [code,setcode] = useState(codeSnippetData.code);
  const isEditing = code !== codeSnippetData.code || title !== codeSnippetData.title;
  const fetcher = useFetcher();
  const [isFocusing,setIsFocusing] = useState(false);
  
  useEffect(() => {
    setcode(codeSnippetData.code);
    setTitle(codeSnippetData.title);
  },[codeSnippetData.code,codeSnippetData.title]);
  return (
    <div id="contact">
      <div></div>
      <div>
        <Box onClick={() => setIsFocusing(true)} fontSize="24px" fontWeight={"bold"}>
          {codeSnippetData.title ? (
            isFocusing ? <TextField autoFocus onBlur={() => {setIsFocusing(false)}} onChange={(e) => {setTitle(e.currentTarget.value)}} value={title} size="medium" sx={{width:"60%"}}/>: <>{title}</>
          ) : (
            <i>No Title</i>
          )}{" "}
        </Box>
        <h2>
          {codeSnippetData.created_date ? (
            <>作成日時: {changeDateFormat(codeSnippetData.created_date)}</>
          ) : (
            <i>No 日時</i>
          )}{" "}
        </h2>
        <div style={{width:"1200px"}}>
          <fetcher.Form></fetcher.Form>
          <CodeMirror
            value={code}
            height="100%"
            width="1075px"
            extensions={[javascript({ jsx: true })]}
            onChange={(val) => {
              setcode(val)
            }}
          />
        </div>
        <div>
          {isEditing && <Form
            method="post"
            onSubmit={(event) => {
              if (!confirm("Please confirm you want to delete this record.")) {
                event.preventDefault()
              }
            }}>
            <button type="submit" onClick={() => {
              fetcher.submit({code,title},{method:"patch"});
            }}>
              保存
            </button>
          </Form>}
          <Form
            method="post"
            action="destroy"
            onSubmit={(event) => {
              if (!confirm("Please confirm you want to delete this record.")) {
                event.preventDefault()
              }
            }}>
            <button type="submit" disabled>
              Delete
            </button>
          </Form>
        </div>
      </div>
    </div>
  )
}

function Favorite({
  contact,
}: {
  contact: {
    favorite: boolean
    avatar: string
    first: string
    last: string
    twitter: string
    notes: string
  }
}) {
  // yes, this is a `let` for later
  let favorite = contact.favorite
  const fetcher = useFetcher();

  if (fetcher.formData) {
    favorite = fetcher.formData.get("favorite") === "true";
  }
  return (
    <fetcher.Form method="post">
      <button
        name="favorite"
        value={favorite ? "false" : "true"}
        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}>
        {favorite ? "★" : "☆"}
      </button>
    </fetcher.Form>
  )
}
