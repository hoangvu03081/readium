import { useEffect } from "react";
import { useAuth } from "./useAuth";
import useRouter from "./useRouter";

export default function useRequireAuth(redirectUrl = "/") {
  const auth = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (auth === false) {
      router.push(redirectUrl);
    }
  }, [auth, router]);
  return auth;
}
