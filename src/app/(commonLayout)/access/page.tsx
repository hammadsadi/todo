import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

import LoginForm from "@/components/modules/Auth/Login/LoginForm";
import RegisterForm from "@/components/modules/Auth/Register/RegisterForm";
const LoginPage = () => {
  return (
    <div className="max-w-xl mx-auto flex min-h-screen justify-center items-center">
      <Card className="max-w-xl w-full">
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="w-full bg-muted p-1 rounded-lg justify-start">
              <TabsTrigger
                value="login"
                className="data-[state=active]:!bg-[#09090b] data-[state=active]:!text-white flex-1 rounded-md px-4 py-2 text-sm font-medium transition-all"
              >
                Login
              </TabsTrigger>
              <TabsTrigger
                value="register"
                className="data-[state=active]:!bg-[#09090b] data-[state=active]:!text-white flex-1 rounded-md px-4 py-2 text-sm font-medium transition-all"
              >
                Sign Up
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="pt-6">
              <LoginForm />
            </TabsContent>

            <TabsContent value="register" className="pt-6 space-y-6">
              <RegisterForm />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
