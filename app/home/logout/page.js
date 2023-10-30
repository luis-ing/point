"use client";

import { useEffect } from "react";
import { useAuthContext } from "@/contexts/authContext";
import { useRouter } from "next/navigation";

const Page = () => {
    const { logout } = useAuthContext();
    const router = useRouter();

    useEffect(() => {
        logout();
        router.push("/login");
    }, []);
}

export default Page;