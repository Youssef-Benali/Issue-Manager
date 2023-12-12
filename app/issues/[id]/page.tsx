import authOptions from "@/app/auth/authOptions";
import prisma from "@/prisma/client";
import { Box, Button, Grid } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache } from "react";
import DeleteIssueButton from "./DeleteIssueButton";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";

interface Props {
  params: { id: string };
}

const fetchUser = cache((issueId: number) =>
  prisma.issue.findUnique({
    where: { id: issueId },
  })
);

const IssueDetailPage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);

  const issue = await fetchUser(parseInt(params.id));

  if (!issue) return notFound();

  return (
    <Grid columns={{ initial: "1" }} gap="5">
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      {session && (
        <Grid columns={{ initial: "2", xs: "3" }} width="max-content" gap="4">
          <EditIssueButton issueId={issue.id} />
          <DeleteIssueButton issueId={issue.id} />
          <Link href="/issues/list">
            <Button color="gray" variant="soft">
              Go to Issues
            </Button>
          </Link>
        </Grid>
      )}
      {!session && (
        <Button className="w-fit" color="gray" variant="soft">
          <Link href="/issues/list">Go to Issues</Link>
        </Button>
      )}
    </Grid>
  );
};

export async function generateMetadata({ params }: Props) {
  const issue = await fetchUser(parseInt(params.id));

  return {
    title: issue?.title,
    description: "Details of issue " + issue?.id,
  };
}

export default IssueDetailPage;
