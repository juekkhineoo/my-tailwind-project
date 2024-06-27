import Link from "next/link";
import UserInfo from "./user/page";

export default function Page() {
  return (
    <>
      <h1>Hello, Next.js!</h1>
      <div>
        <Link href="/polygon">Draw Polygon</Link>
      </div>
      {/* <div>
        <Link href="/example">Group drag</Link>
      </div>
      <div>
        <Link href="/shape">Drawing Shape</Link>
      </div> */}
      <div>
        <Link href="/user">UserInfo</Link>
      </div>
    </>
  );
}
