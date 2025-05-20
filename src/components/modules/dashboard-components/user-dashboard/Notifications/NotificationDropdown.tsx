"use client";
import { Bell } from "lucide-react";
import { TInvitation } from "@/types/invitation.type";
import { getTimeDifference } from "@/utils/getTimeDifference";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { updateInvitation } from "@/services/Invitations";
import { toast } from "sonner";

export default function NotificationDropdown({
  count,
  data,
}: {
  count: number;
  data: TInvitation[];
}) {
  const router = useRouter();

  // Filter to only show unread notifications
  const unreadNotifications = data.filter((invitation) => !invitation.hasRead);

  const handleNotificationClick = () => {
    router.push("/dashboard/user/notification");
  };

  const handleMarkAsRead = async (
    e: React.MouseEvent,
    invitationId: string
  ) => {
    e.stopPropagation(); // Prevent triggering the parent click handler
    const data = {
      hasRead: true,
    };
    const res = await updateInvitation(invitationId, data);
    if (!res.success) {
      toast.error(res.message);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="relative">
        <Bell className="h-5 w-5 cursor-pointer" />
        {count > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs px-2 py-1">
            {count}
          </span>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80">
        <div className="flex justify-between items-center px-4 py-2">
          <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        </div>
        <DropdownMenuSeparator />
        {unreadNotifications.length === 0 ? (
          <DropdownMenuItem disabled>
            <p className="text-gray-500">No new notifications</p>
          </DropdownMenuItem>
        ) : (
          unreadNotifications.map((invitation) => (
            <DropdownMenuItem
              key={invitation.id}
              className="flex flex-col items-start p-3 hover:bg-gray-100 cursor-pointer"
              onClick={handleNotificationClick}
            >
              <div className="flex items-start gap-3 w-full">
                <div className="flex-1">
                  <p className="text-sm font-medium">
                    <span className="font-semibold">
                      {invitation.inviter.name}
                    </span>{" "}
                    invited you to{" "}
                    <span className="font-semibold">
                      {invitation.event.title}
                    </span>
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="flex justify-between items-center mt-1">
                      <p className="text-xs text-gray-500">
                        {getTimeDifference(invitation.createdAt)}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      className="text-xs h-7 mt-2 dark:text-white"
                      onClick={(e) => handleMarkAsRead(e, invitation.id)}
                    >
                      Mark as read
                    </Button>
                  </div>
                </div>
              </div>
              <div className="self-end mt-2"></div>
            </DropdownMenuItem>
          ))
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-center text-sm text-blue-600 hover:text-blue-800 cursor-pointer"
          onClick={handleNotificationClick}
        >
          View all notifications
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
