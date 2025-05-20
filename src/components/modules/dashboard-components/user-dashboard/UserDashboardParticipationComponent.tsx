"use client";
import { TInvitation } from "@/types/invitation.type";
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
import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CustomModal } from "@/components/modules/shared/CustomModal";
import CreateInvite from "./invitations/CreateInvite";
import { TParticipant } from "@/types/participant.type";
import Refund from "@/components/modules/Payment/Refund/Refund";

export default function UserDashboardParticipationComponent({
  participation,
}: {
  participation: TParticipant[];
}) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const columns: ColumnDef<TParticipant>[] = [
    {
      accessorKey: "event.title",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Event <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => (
        <Badge variant="secondary">{row.original.event?.title}</Badge>
      ),
    },
    // {
    //   accessorKey: "inviter.name",
    //   header: ({ column }) => (
    //     <Button
    //       variant="ghost"
    //       onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    //     >
    //       Invited By <ArrowUpDown />
    //     </Button>
    //   ),
    //   cell: ({ row }) => (
    //     <Badge variant="outline">{row.original.inviter?.name}</Badge>
    //   ),
    // },
    {
      accessorKey: "fee",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Fee <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => <span>BDT{row.original.event.fee}</span>,
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
              : "bg-rose-400 hover:bg-rose-500"
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
            "bg-gray-300-400 hover:bg-gray-500":
              row.original.status === "BANNED",
          })}
        >
          {row.original.status}
        </Badge>
      ),
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Start Date <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => (
        <span className="text-sm">
          {format(new Date(row.original?.event?.startDate), "PPP")}
        </span>
      ),
    },

    {
      id: "actions",
      header: "Refund",
      cell: ({ row }) => {
        const invitation = row.original;
        return (
          <CustomModal
            trigger={
              <Button
                disabled={invitation.status === "APPROVED"}
                className={cn({
                  "bg-green-400 hover:bg-green-500":
                    row.original.status === "PENDING",
                  "bg-rose-400 disabled:bg-rose-400 disabled:cursor-not-allowed hover:bg-red-500":
                    row.original.status === "APPROVED",
                })}
                size="sm"
              >
                Check
              </Button>
            }
            content={<Refund participant={invitation} />}
            title="Confirm Refund"
          />
        );
      },
    },
  ];

  const table = useReactTable({
    data: participation,
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
      <div className="flex  justify-between items-center">
        <h1 className="text-2xl font-bold">My Participation</h1>
        <CustomModal
          content={<CreateInvite />}
          trigger={
            <Button className="h-8 text-white" effect={"shine"}>
              Invite
            </Button>
          }
        />
      </div>
      <div className="flex items-center py-4">
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
      </div>
      {participation?.length === 0 ? (
        <div className="flex items-center justify-center h-full">
          <h1 className="text-2xl font-bold">No Participation Found</h1>
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
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
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
