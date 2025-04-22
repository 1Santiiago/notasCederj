"use client";
import { ModeToggle } from "@/components/modeToggle";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@radix-ui/react-dialog";
import { DialogHeader } from "@/components/ui/dialog";
import { useState } from "react";

type FormInputs = {
  ad1: number;
  ap1: number;
  ad2: number;
  ap2?: number | undefined;
};

export default function Home() {
  const [resultado, setResultado] = useState("");
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm<FormInputs>();
  const onSubmit = (data: FormInputs) => {
    const n1 = data.ad1 * 0.2 + data.ap1 * 0.8;
    const ad2Peso = data.ad2 * 0.2;
    const mediaMinima = 6;

    const ap2Minima = (mediaMinima * 2 - n1 - ad2Peso) / 0.8;

    const resultadoTexto =
      ap2Minima > 10
        ? "Infelizmente, não é possível alcançar a média 6 mesmo com nota máxima na AP2. <strong>Você precisa da AP3</strong>"
        : `Você precisa tirar pelo menos <strong>${ap2Minima.toFixed(
            2
          )}</strong> na AP2 para ser aprovado.`;

    setResultado(resultadoTexto);
    setOpen(true);
    reset();
  };

  return (
    <div className=" lg:w-4/12 mx-auto py-10 w-full">
      <Card>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardHeader>
            <div className="flex justify-between align-middle ">
              <CardTitle>Calcular nota</CardTitle>
              <ModeToggle />
            </div>
            <CardDescription>
              Descubra quanto precisa tirar na ap2 para ser aprovado
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Label htmlFor="ad1">Nota da AD1</Label>
            <Input
              id="ad1"
              placeholder="Digite sua nota AD1"
              required
              {...register("ad1")}
            />
            <Label htmlFor="ap1">Nota da AP1</Label>
            <Input
              id="ap1"
              placeholder="Digite sua nota AP1"
              required
              {...register("ap1")}
            />
            <Label htmlFor="ad2">Nota da AD2</Label>
            <Input
              id="ad2"
              placeholder="Digite sua nota AD2"
              {...register("ad2")}
            />
          </CardContent>
          <CardFooter className="py-4">
            <Button type="submit">Calcular nota</Button>
          </CardFooter>
          <div className="flex justify-center">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogDescription asChild>
                    <div
                      className="w-full p-10"
                      dangerouslySetInnerHTML={{ __html: resultado }}
                    />
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        </form>
      </Card>
    </div>
  );
}
