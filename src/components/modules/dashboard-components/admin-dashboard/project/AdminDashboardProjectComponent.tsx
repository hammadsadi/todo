"use client";
// import ConfirmationBox from "@/components/modules/shared/ConfirmationBox";
// import { CustomModal } from "@/components/modules/shared/CustomModal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import { ArrowUpDown, ChevronDown, Edit, Eye, Trash2 } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { toast } from "sonner";
import { MdBlock } from "react-icons/md";
import { CgUnblock } from "react-icons/cg";
import { TProjects } from "@/types/project.types";
import Link from "next/link";

export default function AdminDashboardProjectComponent({
  projects,
}: {
  projects: TProjects[];
}) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const columns: ColumnDef<TProjects>[] = [
    // {
    //   accessorKey: "profileImage",
    //   header: "Image",
    //   cell: ({ row }) => (
    //     <Image
    //       src={
    //         row.original.profileImage ||
    //         "https://res.cloudinary.com/djlpoyqau/image/upload/v1741195711/clinets-profile_gwta7f.png"
    //       }
    //       alt={row.original.name}
    //       width={40}
    //       height={40}
    //       className="rounded-full"
    //     />
    //   ),
    // },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => row.getValue("name"),
    },
    {
      accessorKey: "username",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Username <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => row.getValue("username"),
    },
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
      accessorKey: "role",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Role <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => (
        <Badge
          className={`${
            row.getValue("role") === "ADMIN"
              ? "bg-blue-400 hover:bg-blue-500"
              : "bg-amber-400 hover:bg-amber-500"
          }`}
        >
          {row.getValue("role")}
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
          className={`${
            row.getValue("status") === "ACTIVE"
              ? "bg-blue-400 hover:bg-blue-500"
              : "bg-amber-400 hover:bg-amber-500"
          }`}
        >
          {row.getValue("status")}
        </Badge>
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
    data: projects,
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
        <div className="flex gap-2">
          <Button size="sm" className="dark:text-white">
            <Link href="/dashboard/admin/projects/create">Add Project</Link>
          </Button>
        </div>
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
      {projects?.length == 0 ? (
        <div className="flex items-center justify-center h-full">
          <h1 className="text-2xl font-bold">No Users Found</h1>
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
