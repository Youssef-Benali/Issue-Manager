import { IssueStatusBadge } from "@/app/components";
import { Issue } from "@prisma/client";
import { Box, Card, Flex, Heading, Text } from "@radix-ui/themes";
import ReactMarkDown from "react-markdown";
import AssigneeSelect from "./AssigneeSelect";

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
        <Box>
          <AssigneeSelect issue={issue} />
        </Box>
      </Flex>
      <Card className="prose max-w-full" mt="4">
        <ReactMarkDown>{issue.description}</ReactMarkDown>
      </Card>
    </>
  );
};

export default IssueDetails;
