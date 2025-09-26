'use client';

import { useState } from 'react';
import { Card, CardContent } from "@/features/shared/components/base/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/features/shared/components/base/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/features/shared/components/base/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/features/shared/components/base/dialog"
import { CardHeader, CardTitle, CardDescription } from "@/features/shared/components/base/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/features/shared/components/base/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/features/shared/components/base/avatar";
import { authClient } from "@/infrastructure/auth/auth-client";
import type { ExtendedSession } from "@/types/entities/session.entity";
import { headers } from "next/headers";

interface EvaluationProps {
  user: {
    id: string;
    name: string;
    email: string;
  };
  attendedEvents: { user_event: { id: string; userId: string; eventId: number; firstCheckinAt: Date | null; lastCheckinAt: Date | null; terminalId: string | null; }; event_name: { id: number; title: string; type: string; } | null; }[];
}

export function SessionComponent({ user, attendedEvents }: EvaluationProps) {

  return (
    <div>
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <h1 className="font-bold text-3xl text-foreground">Attended Sessions</h1>
        </div>
      </div>
      <div className="w-screen overflow-x-auto">
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="p-4 font-medium text-foreground">
                <p className="whitespace-normal">Session</p>
              </TableHead>
              <TableHead className="p-4 font-medium text-foreground">
                <p className="whitespace-normal">Type</p>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {attendedEvents.map((event) => (
              <TableRow key={event.user_event.id}>
                <TableCell className="p-4 font-medium text-foreground">
                  <p className="whitespace-normal">{event.event_name?.title}</p>
                </TableCell>
                <TableCell className="p-4 font-medium text-foreground">
                  <p className="whitespace-normal">{event.event_name?.type}</p>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}