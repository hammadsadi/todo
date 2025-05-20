"use client";
import { getLoggedInUserEvent } from "@/services/Event";
import { getUsersForInvitation } from "@/services/User";
import { TEvent } from "@/types/event.type";
import { IUser } from "@/types/user.types";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { createInvitation } from "@/services/Invitations";

export default function CreateInvite() {
  const [events, setEvents] = useState<TEvent[]>([]);
  const [users, setUsers] = useState<IUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedEventId, setSelectedEventId] = useState<string>("");
  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const [eventsResponse, usersResponse] = await Promise.all([
          getLoggedInUserEvent(),
          getUsersForInvitation(),
        ]);

        if (isMounted) {
          setEvents(eventsResponse.data.result);
          setUsers(usersResponse.data);
        }
      } catch (err) {
        if (isMounted) {
          setError("Failed to load data. Please try again.");
          console.error(err);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSendInvitation = async () => {
    if (!selectedEventId || !selectedUserId) {
      toast.error("Please select both an event and a user");
      return;
    }

    setIsSending(true);
    const sendingInvitation = toast.loading("Sending invitation...");

    try {
      // Assuming you have a service function for sending invitations
      const response = await createInvitation({
        eventId: selectedEventId,
        participantId: selectedUserId,
      });

      if (response.success) {
        toast.success("Invitation sent successfully!", {
          id: sendingInvitation,
        });
        // Reset selections after successful invitation
        setSelectedEventId("");
        setSelectedUserId("");
      } else {
        toast.error(response.message || "Failed to send invitation", {
          id: sendingInvitation,
        });
      }
    } catch (error) {
      toast.error("Something went wrong!", { id: sendingInvitation });
      console.error(error);
    } finally {
      setIsSending(false);
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading...</span>
        <span className="ml-2">This may take a while</span>
      </div>
    );

  if (error)
    return (
      <div className="p-4 bg-red-50 text-red-500 rounded-md">
        {error}
        <Button
          variant="outline"
          className="mt-2"
          onClick={() => window.location.reload()}
        >
          Try Again
        </Button>
      </div>
    );

    return (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Send Event Invitation</h2>
            <p className="text-muted-foreground">
              Select an event and a user to send an invitation
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Event</label>
              <Select 
                value={selectedEventId} 
                onValueChange={setSelectedEventId}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select an event" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {events.length > 0 ? (
                      events.map((event) => (
                        <SelectItem key={event.id} value={event.id}>
                          {event.title}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="no-events" disabled>
                        No events available
                      </SelectItem>
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
    
            <div className="space-y-2">
              <label className="text-sm font-medium">Select User</label>
              <Select 
                value={selectedUserId} 
                onValueChange={setSelectedUserId}
                disabled={!selectedEventId}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={selectedEventId ? "Select a user" : "Select an event first"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {users.length > 0 ? (
                      users.map((user) => (
                        <SelectItem key={user.id} value={user.id}>
                          {user.name} ({user.email})
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="no-users" disabled>
                        No users available
                      </SelectItem>
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
    
            {selectedEventId && selectedUserId && (
              <div className="p-4 bg-blue-50 rounded-md">
                <p className="font-medium">Invitation Summary:</p>
                <p>Event: {events.find(e => e.id === selectedEventId)?.title}</p>
                <p>User: {users.find(u => u.id === selectedUserId)?.name}</p>
              </div>
            )}
          </div>
          
          <Button 
            onClick={handleSendInvitation} 
            disabled={!selectedEventId || !selectedUserId || isSending}
            className="w-full"
          >
            {isSending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              "Send Invitation"
            )}
          </Button>
        </div>
      );
    }