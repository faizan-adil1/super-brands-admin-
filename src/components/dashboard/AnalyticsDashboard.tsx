import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LineChart,
  BarChart,
  PieChart,
  Activity,
  Users,
  ShoppingBag,
  DollarSign,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  trend?: {
    value: string;
    isPositive: boolean;
  };
}

const StatCard = (
  { title, value, description, icon, trend }: StatCardProps = {
    title: "Total Revenue",
    value: "$45,231.89",
    description: "Monthly revenue",
    icon: <DollarSign className="h-4 w-4 text-muted-foreground" />,
    trend: {
      value: "20.1%",
      isPositive: true,
    },
  },
) => (
  <Card className="bg-white">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <div className="h-4 w-4 text-muted-foreground">{icon}</div>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <div className="flex items-center text-xs text-muted-foreground">
        {trend && (
          <>
            {trend.isPositive ? (
              <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
            ) : (
              <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />
            )}
            <span
              className={trend.isPositive ? "text-green-500" : "text-red-500"}
            >
              {trend.value}
            </span>
          </>
        )}
        <span className="ml-1">{description}</span>
      </div>
    </CardContent>
  </Card>
);

interface ChartCardProps {
  title: string;
  description?: string;
  chart: React.ReactNode;
}

const ChartCard = (
  { title, description, chart }: ChartCardProps = {
    title: "Overview",
    description: "Monthly revenue statistics",
    chart: (
      <div className="h-[200px] w-full bg-slate-100 rounded-md flex items-center justify-center">
        <p className="text-muted-foreground">Chart visualization</p>
      </div>
    ),
  },
) => (
  <Card className="col-span-2 bg-white">
    <CardHeader>
      <CardTitle>{title}</CardTitle>
      {description && <CardDescription>{description}</CardDescription>}
    </CardHeader>
    <CardContent>{chart}</CardContent>
  </Card>
);

interface AnalyticsDashboardProps {
  userRole?: "admin" | "brand";
}

const AnalyticsDashboard = ({
  userRole = "admin",
}: AnalyticsDashboardProps) => {
  return (
    <div className="p-6 space-y-6 bg-slate-50">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <Tabs defaultValue="overview" className="w-[400px]">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Revenue"
          value="$45,231.89"
          description="Monthly revenue"
          icon={<DollarSign className="h-4 w-4" />}
          trend={{ value: "20.1%", isPositive: true }}
        />
        <StatCard
          title="New Customers"
          value="+2350"
          description="From last month"
          icon={<Users className="h-4 w-4" />}
          trend={{ value: "10.3%", isPositive: true }}
        />
        <StatCard
          title="Total Orders"
          value="12,234"
          description="For this quarter"
          icon={<ShoppingBag className="h-4 w-4" />}
          trend={{ value: "5.1%", isPositive: false }}
        />
        <StatCard
          title="Active Users"
          value="573"
          description="Currently online"
          icon={<Activity className="h-4 w-4" />}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <ChartCard
          title="Revenue Overview"
          description="Monthly revenue for the current year"
          chart={
            <div className="h-[300px] w-full bg-slate-50 rounded-md flex items-center justify-center">
              <LineChart className="h-16 w-16 text-muted-foreground" />
              <p className="ml-2 text-muted-foreground">
                Revenue trend visualization
              </p>
            </div>
          }
        />
        <Card className="col-span-1 lg:col-span-3 bg-white">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest system events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center">
                  <div className="mr-4 rounded-full bg-primary/10 p-2">
                    <TrendingUp className="h-4 w-4 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {userRole === "admin"
                        ? "New brand registration"
                        : "Campaign performance update"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {`${i} hour${i > 1 ? "s" : ""} ago`}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <ChartCard
          title="Sales Distribution"
          description="By product category"
          chart={
            <div className="h-[200px] w-full bg-slate-50 rounded-md flex items-center justify-center">
              <PieChart className="h-16 w-16 text-muted-foreground" />
              <p className="ml-2 text-muted-foreground">
                Category distribution
              </p>
            </div>
          }
        />
        <ChartCard
          title="Monthly Comparison"
          description="Year over year performance"
          chart={
            <div className="h-[200px] w-full bg-slate-50 rounded-md flex items-center justify-center">
              <BarChart className="h-16 w-16 text-muted-foreground" />
              <p className="ml-2 text-muted-foreground">Monthly comparison</p>
            </div>
          }
        />
      </div>

      {userRole === "admin" && (
        <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-1">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle>System Performance</CardTitle>
              <CardDescription>Server and application metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  "API Response Time",
                  "Database Load",
                  "Memory Usage",
                  "CPU Utilization",
                ].map((metric) => (
                  <div key={metric} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{metric}</span>
                      <span className="text-sm text-muted-foreground">
                        Healthy
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-slate-100">
                      <div
                        className="h-2 rounded-full bg-green-500"
                        style={{
                          width: `${Math.floor(Math.random() * 30) + 20}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {userRole === "brand" && (
        <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-1">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Campaign Performance</CardTitle>
              <CardDescription>Active marketing campaigns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  "Summer Sale",
                  "New Product Launch",
                  "Holiday Special",
                  "Loyalty Program",
                ].map((campaign) => (
                  <div key={campaign} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{campaign}</span>
                      <span className="text-sm text-muted-foreground">
                        {Math.floor(Math.random() * 5000) + 1000} impressions
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-slate-100">
                      <div
                        className="h-2 rounded-full bg-blue-500"
                        style={{
                          width: `${Math.floor(Math.random() * 60) + 30}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AnalyticsDashboard;
