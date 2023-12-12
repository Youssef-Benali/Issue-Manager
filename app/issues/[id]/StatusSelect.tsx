"use client";
import { Issue, Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import toast, { Toaster } from "react-hot-toast";

const StatusSelect = ({ issue }: { issue: Issue }) => {
  const statusContainer: { label: string; value: Status }[] = [
    { label: "Open", value: Status.OPEN },
    { label: "Closed", value: Status.CLOSED },
    { label: "In Progress", value: Status.IN_PROGRESS },
  ];

  const { status } = useSession();
  const router = useRouter();

  if (status === "unauthenticated") return null;

  const patchStatus = (status: string) => {
    axios.patch("/api/issues/" + issue.id, { status }).catch(() => {
      toast.error("The status of the issue didn't change");
    });
  };

  return (
    <>
      <Select.Root
        onValueChange={(status) => {
          patchStatus(status);
          router.refresh();
        }}
      >
        <Select.Trigger placeholder="Change Status" />
        <Select.Content position="popper">
          <Select.Group>
            <Select.Label>Status</Select.Label>
            {statusContainer.map((s) => (
              <Select.Item
                key={s.label}
                value={s.value}
                className="!cursor-pointer"
              >
                {s.label}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

export default StatusSelect;
