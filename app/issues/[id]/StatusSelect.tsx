"use client";
import { Select } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import React from "react";
import { Toaster } from "react-hot-toast";

const StatusSelect = () => {
  const { status } = useSession();

  if (status === "unauthenticated") return null;

  return (
    <>
      <Select.Root onValueChange={() => console.log("value changed")}>
        <Select.Trigger placeholder="Status" />
        <Select.Content position="popper">
          <Select.Group>
            <Select.Label>Status</Select.Label>
            <Select.Item value="Closed" className="!cursor-pointer">
              Closed
            </Select.Item>
            <Select.Item value="Open" className="!cursor-pointer">
              Open
            </Select.Item>
            <Select.Item value="In Progress" className="!cursor-pointer">
              In Progress
            </Select.Item>
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

export default StatusSelect;
