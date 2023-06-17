import { redirect } from "react-router-dom";

export async function action() {
  const resposne = await fetch(
    process.env.REACT_APP_BACKEND_HOST + "/auth/logout"
  );
  console.log(await resposne.json());
  return redirect("/");
}
