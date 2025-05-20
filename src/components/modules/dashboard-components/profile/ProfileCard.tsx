"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Mail, User } from "lucide-react";

interface ProfileCardProps {
  user: {
    name: string;
    email: string;
    username: string;
    role: string;
    status: string;
    image: string | null;
    createdAt: string;
  };
}

export default function ProfileCard({ user }: ProfileCardProps) {
  const createdDate = new Date(user.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };

  return (
    <Card className="overflow-hidden">
      <div className="h-24 bg-gradient-to-r from-primary to-primary/60"></div>
      <CardContent className="p-6 -mt-12 flex flex-col items-center">
        <Avatar className="h-24 w-24 border-4 border-background">
          <AvatarImage src={user.image || ""} alt={user.name} />
          <AvatarFallback className="text-xl bg-primary/20">
            {getInitials(user.name)}
          </AvatarFallback>
        </Avatar>

        <h2 className="text-2xl font-bold mt-4">{user.name}</h2>
        <p className="text-muted-foreground">@{user.username}</p>

        <div className="flex gap-2 mt-2">
          <Badge variant="secondary" className="capitalize">
            {user.role.toLowerCase()}
          </Badge>
          <Badge
            className={user.status === "ACTIVE" ? "bg-green-500" : "bg-red-500"}
          >
            {user.status}
          </Badge>
        </div>

        <div className="w-full mt-6 space-y-3">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Mail className="h-4 w-4" />
            <span>{user.email}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <User className="h-4 w-4" />
            <span>@{user.username}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <CalendarDays className="h-4 w-4" />
            <span>Joined {createdDate}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
