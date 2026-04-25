import { signIn, signOut, useSession } from "next-auth/react";
import { Github, Chrome } from "lucide-react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  const { data: session, status } = useSession();
  if (status === "loading") {
    return <p>loading...</p>;
  }
  if (session) {
    return (
      <main className="min-h-screen flex items-center justify-center px-6">
        <div className="w-full max-w-md rounded-2xl border p-8 shadow-sm bg-white">
          <h1 className="text-2xl font-bold mb-4">You are signed in</h1>
          <p className="mb-2">Name: {session.user?.name}</p>
          <p className="mb-2">Email: {session.user?.email}</p>
          <p className="mb-6">Role: {session.user?.role}</p>
          <Link href="/admin">Admin</Link>

          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="w-full rounded-xl bg-black text-white py-3 hover:opacity-90 transition"
          >
            Sign out
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-6 bg-neutral-50">
      <div className="w-full max-w-md rounded-2xl border bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold mb-2">Welcome back</h1>
        <p className="text-neutral-600 mb-6">
          Sign in to access the admin area
        </p>
        <button
          onClick={() => signIn("google")}
          className="w-full flex items-center justify-center gap-3 rounded-xl bg-black text-white py-3 hover:opacity-90 transition mt-3"
        >
          <FcGoogle size={20} />
          Continue with Google
        </button>
        <button
          onClick={() => signIn("github")}
          className="w-full flex items-center justify-center gap-3 rounded-xl bg-black text-white py-3 hover:opacity-90 transition mt-3"
        >
          <Github className="w-5 h-5" />
          Continue with GitHub
        </button>
      </div>
    </main>
  );
}
