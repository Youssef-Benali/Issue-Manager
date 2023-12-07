import { Status } from "@prisma/client";
import { Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

interface IssueStatus {
  open: number;
  inProgress: number;
  closed: number;
}

interface Props {
  issueStatus: IssueStatus;
}

const IssueSummary = ({ issueStatus }: Props) => {
  const containers: {
    label: string;
    value: number;
    status: Status;
  }[] = [
    { label: "Open Issues", value: issueStatus.open, status: "OPEN" },
    {
      label: "In-progress Issues",
      value: issueStatus.inProgress,
      status: "IN_PROGRESS",
    },
    { label: "Closed Issues", value: issueStatus.closed, status: "CLOSED" },
  ];

  return (
    <Flex gap="4">
      {containers.map((container) => (
        <Card key={container.label}>
          <Flex direction="column" gap="1">
            <Link
              href={`/issues/list?status=${container.status}`}
              className="text-sm font-medium"
            >
              {container.label}
            </Link>
            <Text size="5" className="font-bold">
              {container.value}
            </Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};

export default IssueSummary;
