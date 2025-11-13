 
import React from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "../hooks/useAuth";

const SettingsPage = () => {
  const { logout } = useAuth();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Settings</h2>
        <Button 
          onClick={logout}
          variant="destructive"
          className="bg-red-600 hover:bg-red-700"
        >
          Logout
        </Button>
      </div>
      <p>Settings page content will go here.</p>
    </div>
  );
};

export default SettingsPage;