"use client";
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
import { ArrowUpDown, ChevronDown } from "lucide-react";
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
import { Trash2, Edit } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import { useState } from "react";
import { CustomModal } from "@/components/modules/shared/CustomModal";
import ConfirmationBox from "@/components/modules/shared/ConfirmationBox";
import { TReview } from "@/types/review.type";
import UpdateReview from "./UpdateReview/UpdateReview";
import { deleteReview } from "@/services/Review";

export default function UserDashboardReviewComponent({
  review,
}: {
  review: TReview[];
}) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  // Logged In User Single Event Delete
  const handleDelete = async (id: string) => {
    const reviewDeleting = toast.loading("Review Deleting...");
    try {
      const res = await deleteReview(id);
      if (res.success) {
        toast.success(res.message, { id: reviewDeleting });
      } else {
        toast.error(res.message, { id: reviewDeleting });
      }
    } catch {
      toast.error("Something went wrong!", { id: reviewDeleting });
    }
  };

  const columns: ColumnDef<TReview>[] = [
    {
      accessorKey: "image",
      header: "Image",
      cell: ({ row }) => (
        <Image
          src={row.original?.event?.image}
          alt={row.original?.event?.title}
          width={50}
          height={50}
          className="rounded w-auto h-auto object-cover"
        />
      ),
    },
    {
      accessorKey: "title",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => {
        return <p>{row.original?.event?.title?.slice(0, 15)}</p>;
      },
    },
    {
      accessorKey: "comment",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => {
        return <p>{row.original?.comment.slice(0, 30)}</p>;
      },
    },
    {
      accessorKey: "rating",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Rating <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => <p>{row.original?.rating}</p>,
    },

    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        return (
          <div className="flex gap-2">
            <CustomModal
              trigger={
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
              }
              //enter edit event from here
              //   content={<EditMedicineForm initialData={medicine} />}
              content={<UpdateReview review={row.original} />}
              title="Edit Event"
            />
            <ConfirmationBox
              trigger={
                <Button variant="destructive" size="sm">
                  <Trash2 className="h-4 w-4 text-white" />
                </Button>
              }
              onConfirm={() => handleDelete(row.original.id)}
              title="Are you sure?"
              description="This action cannot be undone."
            />
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: review,
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
          <h1 className="text-2xl font-bold">Reviews List</h1>
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
      {review?.length == 0 ? (
        <div className="flex items-center justify-center h-full">
          <h1 className="text-2xl font-bold">No Events Found</h1>
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
