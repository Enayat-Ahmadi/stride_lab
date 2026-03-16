import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Card, CardTitle, CardHeader, CardContent } from "../ui/card";
import { Field } from "../ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function CheckoutForm({ onSubmit }) {
  return (
    <div className="mx-auto min-h-screen grid max-w-7xl gap-6 lg:grid-cols-3">
      <form onSubmit={onSubmit} className="space-y-6 lg:col-span-2">
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
                required
              />
            </Field>
            <Field className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="email@email.com"
                required
              />
            </Field>
            <Field className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                type="phone"
                name="phone"
                placeholder="+49 123 456789"
                required
              />
            </Field>
          </CardContent>
        </Card>
        {/* Shipping Address Card */}
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Shiping Address</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:col-span-2">
            <Field className="space-y-2">
              <Label htmlFor="street">Street</Label>
              <Input
                type="text"
                name="street"
                id="street"
                placeholder="Street name and house number"
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
                  required
                />
              </Field>
              <Field className="space-y-2">
                <Label htmlFor="postalCode">Postal Code</Label>
                <Input
                  type="number"
                  name="postalCode"
                  id="postalCode"
                  placeholder="10233"
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
            <RadioGroup className="grid grid-cols-2 gap-4">
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
        <Button type="submit" size="lg" className="w-ful rounded-xl">
          Place Order
        </Button>
      </form>
    </div>
  );
}
