import Link from "next/link";
import { MenuIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetHeader,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import logo from "../../../assets/logo.png";
import Image from "next/image";
import { Menu } from "./menu";

export function SheetMenu() {
  return (
    <Sheet>
      <SheetTrigger className="lg:hidden" asChild>
        <Button className="h-8" variant="outline" size="icon">
          <MenuIcon size={20} />
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:w-72 px-3 h-full flex flex-col" side="left">
        <SheetHeader>
          <Button
            className="flex justify-center items-center pb-2 pt-1"
            variant="link"
            asChild
          >
            <Link href="/" className="flex items-center justify-center gap-4">
              <Image
                src={logo}
                alt="dark favicon"
                width={32}
                height={32}
                className="h-8 w-8"
              />
              <SheetTitle className="font-bold text-lg">Sadi</SheetTitle>
              <SheetDescription className="sr-only">
                Hammad Sadi
              </SheetDescription>
            </Link>
          </Button>
        </SheetHeader>
        <Menu isOpen />
      </SheetContent>
    </Sheet>
  );
}
