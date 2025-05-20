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

export default function UserDashboardInvitationComponent({
  invitations,
}: {
  invitations: TInvitation[];
}) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const columns: ColumnDef<TInvitation>[] = [
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
    {
      accessorKey: "inviter.name",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Invited By <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => (
        <Badge variant="outline">{row.original.inviter?.name}</Badge>
      ),
    },
    {
      accessorKey: "user.name",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Invited To <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => (
        <Badge variant="outline">{row.original.user?.name}</Badge>
      ),
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => (
        <span className="text-sm">
          {format(new Date(row.original.createdAt), "PPP")}
        </span>
      ),
    },
    {
      accessorKey: "hasRead",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Read <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => (
        <Badge
          className={`${
            row.original.hasRead
              ? "bg-blue-400 hover:bg-blue-500"
              : "bg-amber-400 hover:bg-amber-500"
          }`}
        >
          {row.original.hasRead ? "Yes" : "No"}
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
              row.original.status === "ACCEPTED",
            "bg-red-400 hover:bg-red-500": row.original.status === "REJECTED",
            "bg-yellow-400 hover:bg-yellow-500":
              row.original.status === "PENDING",
          })}
        >
          {row.original.status}
        </Badge>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const invitation = row.original;
        // For non-pending invitations, just show view button
        return (
          <Link href={`/events/${invitation.eventId}`}>
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4" />
            </Button>
          </Link>
        );
      },
    },
  ];

  const table = useReactTable({
    data: invitations,
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
        <h1 className="text-2xl font-bold">Pending Invitations</h1>
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
      {invitations?.length === 0 ? (
        <div className="flex items-center justify-center h-full">
          <h1 className="text-2xl font-bold">No Invitations Found</h1>
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
