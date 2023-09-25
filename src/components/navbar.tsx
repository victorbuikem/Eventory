import { getAuthSession } from "@/app/(app)/api/auth/[...nextauth]/route";
import Link from "next/link";
import UserAccount from "./userAccount";

type Props = {};

async function Navbar({}: Props) {
  const session = await getAuthSession();
  return (
    <div className="fixed inset-x-0 top-0 bg-white h-fit border-b border-zinc-300 py-2">
      <div className="flex items-center justify-between h-full px-8 mx-auto max-w-7xl">
        <Link href="#">
          <p className="rounded-lg border-2 border-b-4 border-r-4 border-black text-xl font-bold px-3 py-2 transition-all hover:-translate-y-0.5">
            Eventory
          </p>
        </Link>
        {session?.user && <UserAccount user={session.user} />}
      </div>
    </div>
  );
}

export default Navbar;
