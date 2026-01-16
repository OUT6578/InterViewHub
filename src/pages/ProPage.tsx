import React, { useEffect, useState } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { Label } from "../components/ui/label";
import { toast } from "react-hot-toast";

interface Product {
  id: string;
  title: string;
  category: string;
  price: number;
}

const ProPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);

  const [search, setSearch] = useState("");
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");

  /* PAGINATION */
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  /* ---------------- RESET FORM ---------------- */
  const resetForm = () => {
    setId("");
    setTitle("");
    setCategory("");
    setPrice("");
    setEdit(false);
  };

  /* ---------------- SEARCH FILTER ---------------- */
  useEffect(() => {
    if (search.trim()) {
      setFilteredProducts(
        products.filter(
          (product) =>
            product.id.includes(search) ||
            product.title.toLowerCase().includes(search.toLowerCase()) ||
            product.price.toString().includes(search)
        )
      );
    } else {
      setFilteredProducts(products);
    }
    setCurrentPage(1); // reset page on search
  }, [search, products]);

  /* ---------------- PAGINATION LOGIC ---------------- */
  const totalPages = Math.ceil(filteredProducts.length / limit);

  const startIndex = (currentPage - 1) * limit;
  const endIndex = startIndex + limit;

  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  /* ---------------- ADD / UPDATE ---------------- */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!id || !title || !category || !price) {
      toast.error("All fields are required");
      return;
    }

    if (edit) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === id
            ? { id, title, category, price: Number(price) }
            : p
        )
      );
      toast.success("Product updated successfully");
    } else {
      setProducts((prev) => [
        ...prev,
        { id, title, category, price: Number(price) },
      ]);
      toast.success("Product added successfully");
    }

    setOpen(false);
    resetForm();
  };

  /* ---------------- EDIT ---------------- */
  const handleEdit = (p: Product) => {
    setEdit(true);
    setOpen(true);
    setId(p.id);
    setTitle(p.title);
    setCategory(p.category);
    setPrice(String(p.price));
  };

  /* ---------------- DELETE ---------------- */
  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure?")) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
      toast.success("Product deleted successfully");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
          Product Data CRUD
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">Manage your products efficiently</p>
      </div>

      {/* TOP BAR */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <Button
          className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white shadow-lg"
          onClick={() => {
            resetForm();
            setOpen(true);
          }}
        >
          + Add New Product
        </Button>

        <Input
          placeholder="Search by Id / Title / Price"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-64 border-slate-300 dark:border-slate-600"
        />
      </div>

      {/* TABLE CONTAINER */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md overflow-hidden border border-slate-200 dark:border-slate-700">
        <Table>
          <TableHeader className="bg-gradient-to-r from-blue-600 to-blue-500">
            <TableRow>
              <TableHead className="text-white font-semibold">Id</TableHead>
              <TableHead className="text-white font-semibold">Title</TableHead>
              <TableHead className="text-white font-semibold">Category</TableHead>
              <TableHead className="text-white font-semibold">Price</TableHead>
              <TableHead className="text-white font-semibold">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {paginatedProducts.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-slate-500 dark:text-slate-400">
                  No Products Found
                </TableCell>
              </TableRow>
            )}

            {paginatedProducts.map((p) => (
              <TableRow key={p.id} className="hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors border-slate-200 dark:border-slate-700">
                <TableCell className="font-medium text-slate-900 dark:text-slate-100">{p.id}</TableCell>
                <TableCell className="text-slate-700 dark:text-slate-300">{p.title}</TableCell>
                <TableCell className="text-slate-700 dark:text-slate-300">
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded text-sm">
                    {p.category}
                  </span>
                </TableCell>
                <TableCell className="font-semibold text-slate-900 dark:text-slate-100">Rs. {p.price}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="hover:bg-blue-100 dark:hover:bg-blue-900/30"
                      onClick={() => handleEdit(p)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(p.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6 pb-4">
          <Button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            variant="outline"
          >
            Previous
          </Button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              onClick={() => setCurrentPage(page)}
              className={currentPage === page ? "bg-blue-600 hover:bg-blue-700" : ""}
            >
              {page}
            </Button>
          ))}

          <Button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            variant="outline"
          >
            Next
          </Button>
        </div>
      )}

      {/* DIALOG */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>
                {edit ? "Edit Product" : "Add New Product"}
              </DialogTitle>
            </DialogHeader>

            <div className="grid gap-4 mt-4">
              <div>
                <Label>Id</Label>
                <Input value={id} onChange={(e) => setId(e.target.value)} />
              </div>

              <div>
                <Label>Title</Label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div>
                <Label>Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="electronics">Electronics</SelectItem>
                      <SelectItem value="clothing">Clothing</SelectItem>
                      <SelectItem value="books">Books</SelectItem>
                      <SelectItem value="furniture">Furniture</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Price</Label>
                <Input
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>

            <DialogFooter className="mt-4">
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit">
                {edit ? "Update Product" : "Add Product"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProPage;
