// src/components/TestComponent.tsx
import React from "react";
import { Button } from "./ui/Button";
import { Card, CardContent, CardHeader } from "./ui/Card";
import { Input } from "./ui/Input";

export const TestComponent: React.FC = () => {
  return (
    <div className="p-8 space-y-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-900">Style Test</h1>

      <Card>
        <CardHeader>
          <h2 className="text-xl font-bold">Buttons</h2>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4 flex-wrap">
            <Button variant="primary">Primary Button</Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="outline">Outline Button</Button>
            <Button variant="ghost">Ghost Button</Button>
          </div>
          <div className="flex gap-4 flex-wrap">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </div>
          <div className="flex gap-4 flex-wrap">
            <Button loading>Loading</Button>
            <Button disabled>Disabled</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-xl font-bold">Inputs</h2>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input label="Normal Input" placeholder="Type something..." />
          <Input label="Error Input" error="This field is required" />
          <Input label="Helper Input" helper="This is a helpful message" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-xl font-bold">Cards</h2>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card padding="sm" hover>
              <CardContent>
                <h3 className="font-semibold">Small Card</h3>
                <p className="text-gray-600 text-sm">Hover me!</p>
              </CardContent>
            </Card>
            <Card padding="md">
              <CardContent>
                <h3 className="font-semibold">Medium Card</h3>
                <p className="text-gray-600">Default padding</p>
              </CardContent>
            </Card>
            <Card padding="lg">
              <CardContent>
                <h3 className="font-semibold">Large Card</h3>
                <p className="text-gray-600">More padding</p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
