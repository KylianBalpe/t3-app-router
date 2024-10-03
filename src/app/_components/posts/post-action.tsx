"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { MoreHorizontal } from "lucide-react";
import { api } from "@/trpc/react";
import { toast } from "sonner";

type ActionType = {
  id: number;
  isPublic: boolean;
  isArchive: boolean;
  deletedAt: Date | null;
};

export default function PostAction({ action }: { action: ActionType }) {
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const [archiveDialogOpen, setArchiveDialogOpen] = React.useState(false);
  const [publicDialogOpen, setPublicDialogOpen] = React.useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const trpc = api.useUtils();

  const archiveMutation = api.post.archivePost.useMutation({
    onSuccess: () => {
      toast("Post archived");
      setIsLoading(false);
      setArchiveDialogOpen(false);
      void trpc.post.invalidate();
    },
  });

  const handleArchive = async (id: number) => {
    setIsLoading(true);
    try {
      await archiveMutation.mutateAsync(id);
    } catch (error) {
      console.error(error);
    }
  };

  const unarchiveMutation = api.post.unarchivePost.useMutation({
    onSuccess: () => {
      toast("Post unarchived");
      setIsLoading(false);
      setArchiveDialogOpen(false);
      void trpc.post.invalidate();
    },
  });

  const handleUnarchive = async (id: number) => {
    setIsLoading(true);
    try {
      await unarchiveMutation.mutateAsync(id);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteMutation = api.post.deletePost.useMutation({
    onSuccess: () => {
      toast("Post deleted");
      setIsLoading(false);
      setDeleteDialogOpen(false);
      void trpc.post.invalidate();
    },
  });

  const handleDelete = async (id: number) => {
    setIsLoading(true);
    await deleteMutation.mutateAsync(id);
  };

  return (
    <>
      <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <Button size="icon" variant="ghost">
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {!action.isArchive && (
            <DropdownMenuItem
              onClick={() => {
                setArchiveDialogOpen(!archiveDialogOpen);
                setDropdownOpen(!dropdownOpen);
              }}
            >
              Archive
            </DropdownMenuItem>
          )}
          {!action.isPublic && (
            <DropdownMenuItem
              onClick={() => {
                setPublicDialogOpen(!publicDialogOpen);
                setDropdownOpen(!dropdownOpen);
              }}
            >
              Make Public
            </DropdownMenuItem>
          )}
          <DropdownMenuItem
            onClick={() => {
              setDeleteDialogOpen(!deleteDialogOpen);
              setDropdownOpen(!dropdownOpen);
            }}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={archiveDialogOpen} onOpenChange={setArchiveDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Archive post</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to archive this post?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button
                onClick={() => {
                  void handleArchive(action.id);
                }}
                isLoading={isLoading}
              >
                Archive
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={publicDialogOpen} onOpenChange={setPublicDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Make post public</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to public this post?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                void handleUnarchive(action.id);
              }}
            >
              Public
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete post</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this post?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                void handleDelete(action.id);
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
