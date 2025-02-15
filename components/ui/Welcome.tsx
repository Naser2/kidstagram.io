import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Welcome() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/");
    }, 3000); // Redirect after 3 seconds
  }, [router]);

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold text-green-500">Account Created Successfully!</h1>
      <p className="text-gray-500">Redirecting you to the homepage...</p>
    </div>
  );
}
