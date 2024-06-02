"use client";

import { setCookie } from "nookies";
import { useRouter, useSearchParams } from "next/navigation";

const CallbackPage = () => {
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const cookie = searchParams.get("cookie") || "";

  setCookie(null, "igracias", cookie, {
    maxAge: 30 * 24 * 60 * 60,
    path: "/",
  });

  return replace("/");
};

export default CallbackPage;
