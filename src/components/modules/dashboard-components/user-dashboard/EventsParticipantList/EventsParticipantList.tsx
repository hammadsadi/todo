"use client";
import { TEvent } from "@/types/event.type";
import {
  ColumnDef,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useState } from "react";
import Link from "next/link";
import { TParticipantWithUser } from "@/types/participant.type";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateParticipantStatus } from "@/services/Participants";

export default function EventsParticipantList({
  participants,
}: {
  participants: TEvent;
}) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  //  Handle Participant Status
  const handleParticipantStatus = async (
    participantId: string,
    status: string
  ) => {
    const updating = toast.loading("Updating Participant Status...");
    try {
      const res = await updateParticipantStatus({ status }, participantId);
      if (res.success) {
        toast.success("Participant Status Updated", { id: updating });
      } else {
        toast.error("Something went wrong", { id: updating });
      }
    } catch (error: any) {
      toast.error(error?.message, { id: updating });
    }
  };

  const columns: ColumnDef<TParticipantWithUser>[] = [
    {
      accessorKey: "user",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          User <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => (
        <Badge variant="secondary">{row.original.user?.name}</Badge>
      ),
    },
    {
      accessorKey: "hasPaid",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Has Paid <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => (
        <Badge
          className={`${
            row.original.hasPaid
              ? "bg-blue-400 hover:bg-blue-500"
              : "bg-amber-400 hover:bg-amber-500"
          }`}
        >
          {row.original.hasPaid ? "Yes" : "No"}
        </Badge>
      ),
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => (
        <Badge
          className={cn({
            "bg-green-400 hover:bg-green-500":
              row.original.status === "APPROVED",
            "bg-red-400 hover:bg-red-500": row.original.status === "REJECTED",
            "bg-yellow-400 hover:bg-yellow-500":
              row.original.status === "PENDING",
            "bg-gray-400 hover:bg-gray-500": row.original.status === "BANNED",
          })}
        >
          {row.original.status}
        </Badge>
      ),
    },

    {
      id: "actions",
      header: "Take Action",
      cell: ({ row }) => {
        return (
          <Select
            onValueChange={(value) =>
              handleParticipantStatus(row.original.id, value)
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={row.original.status} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="APPROVED">APPROVE</SelectItem>
                <SelectItem value="REJECTED">REJECT</SelectItem>
                <SelectItem value="BANNED">BAN</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        );
      },
    },
  ];
  const table = useReactTable({
    data: participants.participants,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnVisibility,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <h1 className="text-2xl font-bold">
          Participant List For {participants?.title}
        </h1>
        {participants?.participants.length > 0 && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((col) => col.getCanHide())
                .map((col) => (
                  <DropdownMenuCheckboxItem
                    key={col.id}
                    checked={col.getIsVisible()}
                    onCheckedChange={(val) => col.toggleVisibility(val)}
                  >
                    {col.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
      {participants?.participants?.length == 0 ? (
        <div className="flex items-center justify-center h-full">
          <h1 className="text-2xl font-bold">No Participants Found</h1>
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table?.getRowModel()?.rows?.length ? (
                table.getRowModel()?.rows?.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
