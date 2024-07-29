"use client";
import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";
import Loader from "@/components/Loader";
import { useUserStore } from "@/store/userStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SalesmanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const userStore = useUserStore();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        await userStore.fetchUser();
        setLoading(false);
      } catch (e) {
        router.push("/auth");
      }
    })();
  }, []);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <AdminPanelLayout>
          <div className="w-[95%] mx-auto">
            <h1 className="text-3xl my-4">
              Welcome {userStore.user?.username}
            </h1>
            {children}
          </div>
        </AdminPanelLayout>
      )}
    </>
  );
}
