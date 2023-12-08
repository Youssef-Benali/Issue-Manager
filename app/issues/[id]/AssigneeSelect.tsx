"use client";
import Skeleton from "@/app/components/Skeleton";
import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import toast, { Toaster } from "react-hot-toast";

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const { status } = useSession();
  const { data: users, error, isLoading } = useUsers();

  if (status === "unauthenticated") return null;

  if (isLoading) return <Skeleton height="32px" />;

  if (error) return null;

  const assignIssue = (userId: string): void => {
    axios
      .patch("/api/issues/" + issue.id, {
        assignedToUserId: userId || null,
      })
      .catch(() => {
        toast.error("Changes could not be saved.");
      });
  };

  return (
    <>
      <Select.Root onValueChange={assignIssue}>
        <Select.Trigger placeholder="Assign..." />
        <Select.Content position="popper">
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item className="!cursor-pointer" value="Unassigned">
              Unassigned
            </Select.Item>
            {users?.map((user) => (
              <Select.Item
                className="!cursor-pointer"
                key={user.id}
                value={user.id}
              >
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

const useUsers = () =>
  useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get<User[]>("/api/users").then((res) => res.data),
    staleTime: 60 * 1000, // 60s
  });

export default AssigneeSelect;
