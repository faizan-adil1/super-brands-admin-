import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  MoreHorizontal,
  Plus,
  Filter,
  ArrowUpDown,
} from "lucide-react";

interface DataTableProps {
  title?: string;
  description?: string;
  columns?: {
    id: string;
    header: string;
    accessorKey: string;
    cell?: (value: any) => React.ReactNode;
  }[];
  data?: any[];
  onCreateItem?: () => void;
  onEditItem?: (item: any) => void;
  onDeleteItem?: (item: any) => void;
  onPageChange?: (page: number) => void;
  onRowsPerPageChange?: (rowsPerPage: number) => void;
  onSearch?: (searchTerm: string) => void;
  onSort?: (column: string, direction: "asc" | "desc") => void;
  onFilter?: (filters: Record<string, any>) => void;
  isLoading?: boolean;
  totalItems?: number;
  currentPage?: number;
  pageSize?: number;
  pageSizeOptions?: number[];
}

const DataTable: React.FC<DataTableProps> = ({
  title = "Data Table",
  description = "Manage your data with advanced filtering, sorting and pagination.",
  columns = [
    { id: "id", header: "ID", accessorKey: "id" },
    { id: "name", header: "Name", accessorKey: "name" },
    {
      id: "status",
      header: "Status",
      accessorKey: "status",
      cell: (value) => (
        <Badge variant={value === "active" ? "default" : "secondary"}>
          {value}
        </Badge>
      ),
    },
    { id: "createdAt", header: "Created At", accessorKey: "createdAt" },
  ],
  data = [
    { id: 1, name: "Item 1", status: "active", createdAt: "2023-05-01" },
    { id: 2, name: "Item 2", status: "inactive", createdAt: "2023-05-02" },
    { id: 3, name: "Item 3", status: "active", createdAt: "2023-05-03" },
    { id: 4, name: "Item 4", status: "pending", createdAt: "2023-05-04" },
    { id: 5, name: "Item 5", status: "active", createdAt: "2023-05-05" },
  ],
  onCreateItem = () => {},
  onEditItem = () => {},
  onDeleteItem = () => {},
  onPageChange = () => {},
  onRowsPerPageChange = () => {},
  onSearch = () => {},
  onSort = () => {},
  onFilter = () => {},
  isLoading = false,
  totalItems = 100,
  currentPage = 1,
  pageSize = 10,
  pageSizeOptions = [5, 10, 25, 50],
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleSort = (column: string) => {
    const newDirection =
      sortColumn === column && sortDirection === "asc" ? "desc" : "asc";
    setSortColumn(column);
    setSortDirection(newDirection);
    onSort(column, newDirection);
  };

  const handleEdit = (item: any) => {
    setSelectedItem(item);
    setIsEditDialogOpen(true);
    onEditItem(item);
  };

  const handleDelete = (item: any) => {
    setSelectedItem(item);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    onDeleteItem(selectedItem);
    setIsDeleteDialogOpen(false);
  };

  const totalPages = Math.ceil(totalItems / pageSize);

  return (
    <div className="w-full bg-white rounded-lg shadow-sm border p-4 space-y-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-8 w-[200px] md:w-[300px]"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add New
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          {title && <TableCaption>{title}</TableCaption>}
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead
                  key={column.id}
                  className="cursor-pointer"
                  onClick={() => handleSort(column.id)}
                >
                  <div className="flex items-center">
                    {column.header}
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
              ))}
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length + 1}
                  className="h-24 text-center"
                >
                  Loading data...
                </TableCell>
              </TableRow>
            ) : data.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length + 1}
                  className="h-24 text-center"
                >
                  No results found.
                </TableCell>
              </TableRow>
            ) : (
              data.map((row) => (
                <TableRow key={row.id}>
                  {columns.map((column) => (
                    <TableCell key={`${row.id}-${column.id}`}>
                      {column.cell
                        ? column.cell(row[column.accessorKey])
                        : row[column.accessorKey]}
                    </TableCell>
                  ))}
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleEdit(row)}>
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDelete(row)}
                          className="text-destructive"
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <p className="text-sm text-muted-foreground">
            Showing
            <Select
              value={pageSize.toString()}
              onValueChange={(value) => onRowsPerPageChange(Number(value))}
            >
              <SelectTrigger className="h-8 w-[70px] mx-2">
                <SelectValue placeholder={pageSize.toString()} />
              </SelectTrigger>
              <SelectContent side="top">
                {pageSizeOptions.map((option) => (
                  <SelectItem key={option} value={option.toString()}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            of {totalItems} items
          </p>
        </div>

        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                className={
                  currentPage <= 1 ? "pointer-events-none opacity-50" : ""
                }
              />
            </PaginationItem>

            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              // Logic to show pages around current page
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }

              return (
                <PaginationItem key={pageNum}>
                  <PaginationLink
                    isActive={pageNum === currentPage}
                    onClick={() => onPageChange(pageNum)}
                  >
                    {pageNum}
                  </PaginationLink>
                </PaginationItem>
              );
            })}

            {totalPages > 5 && currentPage < totalPages - 2 && (
              <>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink onClick={() => onPageChange(totalPages)}>
                    {totalPages}
                  </PaginationLink>
                </PaginationItem>
              </>
            )}

            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  onPageChange(Math.min(totalPages, currentPage + 1))
                }
                className={
                  currentPage >= totalPages
                    ? "pointer-events-none opacity-50"
                    : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      {/* Create Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Item</DialogTitle>
            <DialogDescription>
              Fill in the details to create a new item.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {columns
              .filter((col) => col.id !== "id" && col.id !== "createdAt")
              .map((column) => (
                <div
                  key={column.id}
                  className="grid grid-cols-4 items-center gap-4"
                >
                  <label htmlFor={column.id} className="text-right font-medium">
                    {column.header}
                  </label>
                  <Input
                    id={column.id}
                    className="col-span-3"
                    placeholder={`Enter ${column.header.toLowerCase()}`}
                  />
                </div>
              ))}
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsCreateDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                onCreateItem();
                setIsCreateDialogOpen(false);
              }}
            >
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Item</DialogTitle>
            <DialogDescription>
              Update the details of the selected item.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {selectedItem &&
              columns
                .filter((col) => col.id !== "id" && col.id !== "createdAt")
                .map((column) => (
                  <div
                    key={column.id}
                    className="grid grid-cols-4 items-center gap-4"
                  >
                    <label
                      htmlFor={`edit-${column.id}`}
                      className="text-right font-medium"
                    >
                      {column.header}
                    </label>
                    <Input
                      id={`edit-${column.id}`}
                      className="col-span-3"
                      defaultValue={selectedItem[column.accessorKey]}
                    />
                  </div>
                ))}
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={() => setIsEditDialogOpen(false)}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              selected item and remove the data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DataTable;
