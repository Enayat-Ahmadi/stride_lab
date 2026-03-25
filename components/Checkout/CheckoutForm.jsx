import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Field } from "../ui/field";
import { Loader2, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardTitle, CardHeader, CardContent } from "../ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function CheckoutForm({ onSubmit, cartProducts }) {
  const [formState, setFormState] = useState("default");
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setFormState("loading");
      await onSubmit(e);
      setFormState("success");
    } catch (error) {
      setFormState(error);
    }
  }
  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {/* Customer Information Card */}
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>Customer Information</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <Field className="space-y-2 md:col-span-2">
            <Label htmlFor="fullname">Full Name</Label>
            <Input
              type="text"
              id="fullname"
              name="fullname"
              placeholder="John Doe"
              autoComplete="name"
              required
            />
          </Field>
          <Field className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              name="email"
              placeholder="johnDoe@email.com"
              autoComplete="email"
              required
            />
          </Field>
          <Field className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              type="tel"
              name="phone"
              placeholder="+49 123 456789"
              autoComplete="tel"
              required
            />
          </Field>
        </CardContent>
      </Card>
      {/* Shipping Address Card */}
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>Shipping Address</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:col-span-2">
          <Field className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              type="text"
              name="address"
              id="address"
              placeholder="Street name and house number"
              autoComplete="street-address"
              required
            />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                type="text"
                name="city"
                id="city"
                placeholder="Berlin"
                autoComplete="address-level2"
                required
              />
            </Field>
            <Field className="space-y-2">
              <Label htmlFor="postalCode">Postal Code</Label>
              <Input
                type="text"
                name="postalCode"
                id="postalCode"
                placeholder="10233"
                autoComplete="postal-code"
                pattern="[0-9]{5}"
                required
              />
            </Field>
          </div>
        </CardContent>
      </Card>
      {/* Paymetn Method Card */}
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            name="paymentMethod"
            defaultValue="card"
            className="grid gap-4 grid-cols-2"
          >
            <div className="flex items-center gap-3 rounded-xl border p-4">
              <RadioGroupItem value="card" id="card" />
              <Label htmlFor="card" className="cursor-pointer">
                Credit / Debit Card
              </Label>
            </div>
            <div className="flex items-center gap-3 rounded-xl border p-4">
              <RadioGroupItem value="paypal" id="paypal" />
              <Label htmlFor="paypal" className="cursor-pointer">
                PayPal
              </Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>
      <Button
        type="submit"
        size="lg"
        className="w-full h-12 rounded-full font-semibold btn-hover"
        disabled={
          formState === "loading " ||
          formState === "success" ||
          cartProducts?.length === 0
        }
      >
        {formState === "loading " ? (
          <span className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            Processing...
          </span>
        ) : formState === "success" ? (
          <span className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4" />
            Order Placed
          </span>
        ) : (
          "Place Order"
        )}
      </Button>
    </form>
  );
}
