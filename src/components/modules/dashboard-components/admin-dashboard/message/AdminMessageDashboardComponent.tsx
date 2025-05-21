"use client";
// import ConfirmationBox from "@/components/modules/shared/ConfirmationBox";
// import { CustomModal } from "@/components/modules/shared/CustomModal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, Edit, Eye, Pen, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import Link from "next/link";
import { TBlog } from "@/types/blog.types";
import { TMessage } from "@/types/message.types";

export default function AdminMessageDashboardComponent({
  message,
}: {
  message: TMessage[];
}) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const columns: ColumnDef<TMessage>[] = [
    {
      accessorKey: "email",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => row.getValue("email"),
    },
    {
      accessorKey: "subject",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Subject <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => (
        <p className="">{row.original.subject?.slice(0, 30)}</p>
      ),
    },
    {
      accessorKey: "description",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Message <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => (
        <p className="">{row.original.description?.slice(0, 40)}</p>
      ),
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Published Date <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => (
        <Badge className="bg-primary text-white">
          {format(new Date(row.original.createdAt), "dd MMMM yyyy")}
        </Badge>
      ),
    },
    {
      accessorKey: "Action",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Action <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button variant="destructive" size="sm">
            <Trash2 />
          </Button>
          <Button variant="secondary" size="sm">
            <Eye />
          </Button>
        </div>
      ),
    },
    // {
    //   id: "actions",
    //   header: "Actions",
    //   cell: ({ row }) => {
    //     const user = row.original;
    //     return (
    //       <div className="flex gap-2">
    //         <CustomModal
    //           trigger={
    //             <Button variant="outline" size="sm">
    //               <Edit className="h-4 w-4" />
    //             </Button>
    //           }
    //           content={<p>Update Modal</p>}
    //           title="Update Role"
    //         />
    //         {user.status === "ACTIVE" ? (
    //           <ConfirmationBox
    //             trigger={
    //               <Button variant="destructive" size="sm">
    //                 <MdBlock className="h-4 w-4 text-white" />
    //               </Button>
    //             }
    //             // onConfirm={() => handleBlockUnblock(user.id, "BLOCKED")}
    //             title="Are you sure?"
    //           />
    //         ) : (
    //           <ConfirmationBox
    //             trigger={
    //               <Button variant="default" size="sm">
    //                 <CgUnblock className="h-4 w-4 text-white" />
    //               </Button>
    //             }
    //             // onConfirm={() => handleBlockUnblock(user.id, "ACTIVE")}
    //             title="Are you sure?"
    //           />
    //         )}
    //         <ConfirmationBox
    //           trigger={
    //             <Button variant="destructive" size="sm">
    //               <Trash2 className="h-4 w-4 text-white" />
    //             </Button>
    //           }
    //           // onConfirm={() => handleDelete(user.id)}
    //           title="Are you sure?"
    //         />
    //       </div>
    //     );
    //   },
    // },
  ];

  const table = useReactTable({
    data: message,
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
      {message?.length == 0 ? (
        <div className="flex items-center justify-center h-full">
          <h1 className="text-2xl font-bold">No Message Found</h1>
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
