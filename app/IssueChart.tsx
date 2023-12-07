"use client";
import { Card } from "@radix-ui/themes";
import React from "react";
import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar } from "recharts";

interface IssueStatus {
  open: number;
  inProgress: number;
  closed: number;
}
interface Props {
  issueStatus: IssueStatus;
}

const IssueChart = ({ issueStatus }: Props) => {
  const data = [
    { label: "Open", value: issueStatus.open },
    { label: "In Progress", value: issueStatus.inProgress },
    { label: "Closed", value: issueStatus.closed },
  ];

  return (
    <Card>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="label" />
          <YAxis />
          <Bar
            dataKey="value"
            barSize={60}
            // The value of fill can be found by inspecting the div element that pass the theme
            style={{ fill: "var(--violet-9)" }}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default IssueChart;
