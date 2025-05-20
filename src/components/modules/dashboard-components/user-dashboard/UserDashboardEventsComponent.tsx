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
import { Input } from "@/components/ui/input";
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
import { Trash2, Edit } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { CustomModal } from "@/components/modules/shared/CustomModal";
import ConfirmationBox from "@/components/modules/shared/ConfirmationBox";
import Link from "next/link";
import CreateEvent from "./CreateEvent/CreateEvent";
import { deleteLoggedInUserSingleEvent } from "@/services/Event";
import UpdateEvent from "./UpdateEvent/UpdateEvent";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Pagination from "@/components/modules/shared/Pagination/Pagination";

type EventProps = {
  result: TEvent[];
  meta: {
    limit: number;
    page: number;
    total: number;
    totalPage: number;
  };
};

export default function UserDashboardEventsComponent({
  events,
}: {
  events: EventProps;
}) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const totalPage = events?.meta.totalPage;
  // Logged In User Single Event Delete
  const handleDelete = async (id: string) => {
    const eventDeleting = toast.loading("Event Deleting...");
    try {
      const res = await deleteLoggedInUserSingleEvent(id);
      if (res.success) {
        toast.success(res.message, { id: eventDeleting });
      } else {
        toast.error(res.message, { id: eventDeleting });
      }
    } catch {
      toast.error("Something went wrong!", { id: eventDeleting });
    }
  };

  const columns: ColumnDef<TEvent>[] = [
    {
      accessorKey: "image",
      header: "Image",
      cell: ({ row }) => (
        <Image
          src={row.original.image}
          alt={row.original.title}
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
      cell: ({ row }) => row.getValue("title"),
    },
    {
      accessorKey: "fee",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Fees <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => (
        <Badge variant="secondary">${row.getValue("fee")}</Badge>
      ),
    },
    {
      accessorKey: "isPublic",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Public/Private <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => (
        <Badge
          className={`${
            row.getValue("isPublic")
              ? "bg-blue-400 hover:bg-blue-500"
              : "bg-amber-400 hover:bg-amber-500"
          }`}
        >
          {row.getValue("isPublic") ? "Public" : "Private"}
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
      cell: ({ row }) => {
        const startDate = new Date(row.original.startDate);
        const endDate = new Date(row.original.endDate);
        const currentDate = new Date();

        let status = "";
        let badgeColor = "";

        if (currentDate < startDate) {
          status = "Upcoming";
          badgeColor = "bg-blue-400 hover:bg-blue-500";
        } else if (currentDate >= startDate && currentDate <= endDate) {
          status = "Ongoing";
          badgeColor = "bg-green-400 hover:bg-green-500";
        } else {
          status = "Completed";
          badgeColor = "bg-gray-400 hover:bg-gray-500";
        }

        return <Badge className={badgeColor}>{status}</Badge>;
      },
    },
    {
      accessorKey: "organizer",
      header: "Organizer",
      cell: ({ row }) => row.original.organizer.email,
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const event = row.original;
        return (
          <div className="flex gap-2">
            <Link href={`/dashboard/user/events/${event.id}`}>
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4" />
              </Button>
            </Link>
            <CustomModal
              trigger={
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
              }
              //enter edit event from here
              //   content={<EditMedicineForm initialData={medicine} />}
              content={<UpdateEvent event={event} />}
              title="Edit Event"
            />
            <ConfirmationBox
              trigger={
                <Button variant="destructive" size="sm">
                  <Trash2 className="h-4 w-4 text-white" />
                </Button>
              }
              onConfirm={() => handleDelete(event.id)}
              title="Are you sure?"
              description="This action cannot be undone."
            />
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: events.result,
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

  //  Handle Searching
  const handleSearchQuery = (query: string, value: string | number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(query, value.toString());
    router.push(`${pathname}?${params.toString()}`);
  };
  return (
    <div className="w-full">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Events</h1>
        <CustomModal
          content={<CreateEvent />}
          trigger={
            <Button className="h-8 text-white" effect={"shine"}>
              Create Event
            </Button>
          }
          title="Create Event"
        />
      </div>
      <div className="flex items-center py-4">
        <div className="flex gap-2">
          <Input
            type="search"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleSearchQuery("searchTerm", e.target.value)
            }
            placeholder="Search by title..."
            className="max-w-sm"
          />
          <Button
            size="sm"
            className="dark:text-white"
            onClick={() => router.push(pathname, { scroll: false })}
          >
            Clear Filters
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
      {events.result.length == 0 ? (
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
      <div className="mt-3">
        <Pagination totalPages={totalPage} />
      </div>
    </div>
  );
}
