'use client';

import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <Card className="max-w-md mx-auto">
      <CardContent className="text-center p-8">
        <AlertTriangle className="h-12 w-12 text-destructive mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">Something went wrong</h3>
        <p className="text-muted-foreground mb-4">{message}</p>
        <Button onClick={onRetry} className="w-full">
          <RefreshCw className="h-4 w-4 mr-2" />
          Try Again
        </Button>
      </CardContent>
    </Card>
  );
}