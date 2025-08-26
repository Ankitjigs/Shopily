"use client";

import { useState, useEffect, useRef } from "react";
import { ShoppingCart, Search, Moon, Sun, Store } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { toast } from "sonner";
import Image from "next/image";

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  cartCount: number;
  resetCart: () => void;
}

export function Header({
  searchQuery,
  onSearchChange,
  cartCount,
  resetCart,
}: HeaderProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setCartOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleResetCart = () => {
    if (cartCount) {
      resetCart();
      toast.success("Cart has been reset!");
    } else {
      toast.error("Cart is already empty");
    }
    setCartOpen(false);
  };

  if (!mounted) {
    return (
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <Link href="/">
              <div className="flex items-center gap-2">
                <Image
                  src="/icons/logo.png"
                  alt="Shopily Logo"
                  width={32}
                  height={32}
                  className="h-8 w-8 text-primary"
                />
                <h1 className="text-xl font-bold">Shopily</h1>
              </div>
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8" />
              <div className="w-8 h-8" />
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <Link href="/">
            <div className="flex items-center gap-2">
              <Image
                src="/icons/logo.png"
                alt="Shopily Logo"
                width={32}
                height={32}
                className="h-8 w-8 text-primary"
              />
              <h1 className="text-xl font-bold">Shopily</h1>
            </div>
          </Link>

          <div className="flex-1 max-w-md mx-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>

            <div className="relative" ref={dropdownRef}>
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                onClick={() => setCartOpen((prev) => !prev)}
              >
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  >
                    {cartCount}
                  </Badge>
                )}
              </Button>

              {cartOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-md shadow-lg z-50">
                  <Button
                    variant={"ghost"}
                    onClick={handleResetCart}
                    className="
                    hover:rounded-md
        w-full text-left px-4 py-2 
        text-gray-600 dark:text-gray-100
        hover:bg-gray-100 dark:hover:bg-neutral-700
        transition-colors
      "
                  >
                    Reset Cart
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
