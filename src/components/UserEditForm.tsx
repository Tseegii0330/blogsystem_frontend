"use client";

import React from "react";
import { FunctionComponent } from "react";
import Cookies from "js-cookie";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UserType } from "@/types/type";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Нэр оруулна уу",
  }),
  email: z.string().min(2, {
    message: "Мэдээлэл оруулна уу",
  }),
  role: z.string().nonempty(),
});

interface UserFormProps {
  user?: UserType | null;
}

type Role = {
  value: string;
  label: string;
};
const roles: Role[] = [
  {
    value: "admin",
    label: "Admin",
  },
  {
    value: "editor",
    label: "Editor",
  },
  {
    value: "reader",
    label: "Reader",
  },
];
const EditUserForm: FunctionComponent<UserFormProps> = ({ user }) => {
  const [open, setOpen] = React.useState(false);
  const [selectedRole, setSelectedRole] = React.useState<Role | null>(null);

  const token = Cookies.get("token");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      role: selectedRole ? selectedRole.value : user?.role,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const finalValues = {
      ...values,
      role: selectedRole ? selectedRole.value : user?.role,
    };

    console.log("finalValues: ", finalValues);

    fetch(`http://localhost:3001/api/users/${user?.id}`, {
      method: "PUT",
      body: JSON.stringify(finalValues),
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    })
      .then(async (res) => {
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.message || "Алдаа гарлаа");
        }
        toast.success("Амжилттай хадгаллаа");
      })
      .catch((error) => {
        toast.warning(error.message);
      });
  }

  return (
    <>
      <h1 className="text-2xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-3xl md:leading-14 mt-4">
        Хэрэглэгчийн мэдээлэл шинэчлэх
      </h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Нэр</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>И-Мэйл</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormItem>
            <FormControl>
              <div className="flex gap-6 items-center">
                <h1 className="text-green-500">Хэрэглэгчийн эрх</h1>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-[150px] justify-start"
                    >
                      {selectedRole ? (
                        <>{selectedRole.label}</>
                      ) : (
                        <>{user?.role}</>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0" align="start">
                    <RoleList
                      setOpen={setOpen}
                      setSelectedRole={setSelectedRole}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </FormControl>
          </FormItem>

          <div>
            <Button className="float-right" type="submit">
              Хадгалах
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

function RoleList({
  setOpen,
  setSelectedRole,
}: {
  setOpen: (open: boolean) => void;
  setSelectedRole: (role: Role | null) => void;
}) {
  return (
    <Command>
      <CommandList>
        <CommandGroup>
          {roles.map((role) => (
            <CommandItem
              key={role.value}
              value={role.value}
              onSelect={(value) => {
                setSelectedRole(
                  roles.find((priority) => priority.value === value) || null
                );
                setOpen(false);
              }}
            >
              {role.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}

export default EditUserForm;
