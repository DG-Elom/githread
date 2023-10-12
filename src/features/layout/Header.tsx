import { getAuthSession } from "@/lib/auth";
import { LoginButton } from "./auth/LoginButton";
import { ThemeToggle } from "@/src/theme/ThemeToggle";
import { UserProfile } from "./auth/UserProfile";
import Link from "next/link";

export const Header = async () => {
  const session = await getAuthSession();
  return (
    <header className="border-b border-b-accent fixed top-0 z-20 bg-background w-full">
      <div className="container flex items-center py-2 max-w-lg m-auto gap-1">
        <Link href="/" className="mr-auto">
          <h2 className="text-2xl font-bold ">Githread</h2>
        </Link>
        {session?.user ? <UserProfile /> : <LoginButton />}
        <ThemeToggle />
      </div>
    </header>
  );
};
