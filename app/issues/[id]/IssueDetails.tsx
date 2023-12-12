import { IssueStatusBadge } from "@/app/components";
import { Issue } from "@prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import ReactMarkDown from "react-markdown";
import AssigneeSelect from "./AssigneeSelect";
import StatusSelect from "./StatusSelect";

const IssueDetails = ({ issue }: { issue: Issue }) => {
  return (
    <>
      <Heading>{issue.title}</Heading>
      <Flex className="space-x-3 my-2" justify="between">
        <Flex align="center" gap="4">
          <IssueStatusBadge status={issue.status} />
          <Text className="text-xs md:text-sm">
            {issue.createdAt.toDateString()}
          </Text>
        </Flex>
        <Flex gap="4">
          <StatusSelect issue={issue} />
          <AssigneeSelect issue={issue} />
        </Flex>
      </Flex>
      <Card className="prose max-w-full" mt="4">
        <ReactMarkDown>{issue.description}</ReactMarkDown>
      </Card>
    </>
  );
};

export default IssueDetails;
