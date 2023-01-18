import {
  Outlet,
  useLoaderData,
  Form,
  NavLink,
  useNavigation,
  LoaderFunctionArgs,
  useSubmit
} from "react-router-dom"

import {CodeSnippetData} from "../types";
import { VITE_API_ENDPOINT } from '../environmentvariables';


const getCodeSnippets = async (title:string = ""):Promise<CodeSnippetData[]> => {
  const res = await fetch(`${VITE_API_ENDPOINT}/snippets${title ? "?title=" + title : ""}`);
  const dataList = await res.json() as CodeSnippetData[];
  return dataList
}
export async function loader({ request,params }:LoaderFunctionArgs) {
  const url = new URL(request.url);
  const title = url.searchParams.get("title") || "";
  const snippetList = await getCodeSnippets(title);
  return { snippetList, title};
}

export default function Root() {
  const { snippetList, title } = useLoaderData() as {snippetList: CodeSnippetData[],title:string};
  const submit = useSubmit();
  const navigation = useNavigation()

  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has("title")
  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          <form id="search-form" role="search">
            <input
              id="title"
              className={searching ? "loading" : ""}
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="title"
              defaultValue={title}
              onChange={(event) => {
                const isFirstSearch = title == null;
                submit(event.currentTarget.form, {
                  replace: !isFirstSearch,
                });              }}
            />
            <div id="search-spinner" aria-hidden hidden={!searching} />
            <div className="sr-only" aria-live="polite"></div>
          </form>
          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>
        <nav>
          {snippetList.length ? (
            <ul>
              {snippetList.map((snippetData) => (
                <li key={snippetData.id}>
                  <NavLink
                    to={`${snippetData.id}${title ? "?title=" + title : ""}`}
                    className={({ isActive, isPending }) =>
                      isActive ? "active" : isPending ? "pending" : ""
                    }>
                    {snippetData.title ? (
                      <>
                        {snippetData.title}
                      </>
                    ) : (
                      <i>No Title</i>
                    )}{" "}
                    {<span>★</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No DataList</i>
            </p>
          )}
        </nav>
      </div>
      <div
        id="detail"
        className={navigation.state === "loading" ? "loading" : ""}>
        <Outlet />
      </div>
    </>
  )
}
