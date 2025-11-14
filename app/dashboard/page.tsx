import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React from "react";

const Dashboard = async () => {
  const session = await auth();
  if (!session?.user) redirect("/login");
  return <div>Welcome, {session.user.name}!</div>;
};

export default Dashboard;
