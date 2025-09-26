"use client";
import { useDeleteCategories, useGetAllCategories } from "@/api/skills";
// import { Cards } from "@/components/card/card";
import { CardsAdd } from "@/app/(admin)/skills/components/card-add";
import { Cards } from "@/components/card/card";
import { AlertDialogDelete } from "@/components/dialog/alert-dialog";
import { LoadingDots } from "@/components/loading/loadings";
import { Button } from "@/components/ui/button";
import { CirclePlus, LoaderCircle, Trash2 } from "lucide-react";
import React from "react";
import { useState } from "react";
import { toast } from "sonner";

export default function DynamicTechForm() {
  const [open, setOpen] = useState(false);
  const {
    data: categories,
    isLoading,
    isError,
    isSuccess,
    isFetching,
  } = useGetAllCategories();
  const [openAlert, setOpenAlert] = useState(false);
  const [getId, setGetId] = useState("");
  const { mutate, isPending } = useDeleteCategories({
    onSuccess: () => {
      setOpenAlert(false);
      toast.success("Delete Successfully");
    },
    onError: (err) => {
      toast.error(`Failed to delete ${err}`);
    },
  });

  const handleDelete = () => {
    mutate(getId);
  };

  if (isLoading) {
    return <LoadingDots />;
  }
  if (isError) {
    return (
      <div className="text-center">
        <p className="text-red-500">Failed to get data</p>
      </div>
    );
  }
  // if (isSuccess && categories?.data.length == 0) {
  //     return (
  //         <div className="text-center">
  //             <p>No data found</p>
  //         </div>

  //     )
  // }
  return (
    <>
      <div className="grid grid-cols-3 gap-3 items-start ">
        {/* 
                    @Note
                    - List category, get dari api get all category
                */}
        {/* data ready */}
        {categories?.data.map((item) => (
          <Cards
            key={item.id}
            category={item.category}
            option={item.skills}
            id={item.id}
            setGetId={setGetId}
            setOpenAlert={setOpenAlert}
          />
        ))}

        {isFetching && !isLoading && (
          <div className="h-[180px] w-full bg-card animate-pulse rounded-md p-2 space-y-2">
            <div className="h-[40px] bg-zinc-800 animate-pulse rounded-md" />
            <div className="h-[40px] bg-zinc-800 animate-pulse rounded-md" />
            <div className="h-[40px] bg-zinc-800 animate-pulse rounded-md" />
          </div>
        )}

        {/* 
                    @Note
                    - Btn add untuk membuka CardAdd
                    - Card add terbuka untuk menambah kategori baru
                    - Saat card add terbuka btn add di hide begitu sebaliknya
                */}
        {open && <CardsAdd setOpen={setOpen} />}
        {!open && (
          <button
            onClick={() => setOpen(true)}
            className="hover:bg-zinc-700 cursor-pointer bg-card text-card-foreground rounded-xl border py-2 flex justify-center shadow-sm"
          >
            <CirclePlus />
          </button>
        )}
      </div>
      {/* popup delete confirmation */}
      <AlertDialogDelete
        open={openAlert}
        onOpenChange={setOpenAlert}
        footer={
          <>
            <Button
              className="cursor-pointer"
              onClick={() => setOpenAlert(false)}
            >
              Cancel
            </Button>
            <Button
              className="cursor-pointer"
              onClick={handleDelete}
              disabled={isPending}
              variant="destructive"
            >
              {isPending ? <LoaderCircle className="animate-spin" /> : "Delete"}
            </Button>
          </>
        }
      />
    </>
  );
}
