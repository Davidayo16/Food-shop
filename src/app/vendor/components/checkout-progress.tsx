interface CheckoutProgressProps {
  currentStep: "delivery" | "summary" | "payment";
}

export function CheckoutProgress({ currentStep }: CheckoutProgressProps) {
  const steps = [
    { id: "delivery", label: "Delivery" },
    { id: "summary", label: "Summary" },
    { id: "payment", label: "Payment" },
  ];

  return (
    <div className="relative flex justify-between">
      {steps.map((step, index) => (
        <div key={step.id} className="flex flex-col items-center">
          <div
            className={`h-8 w-8 rounded-full ${
              currentStep === step.id
                ? "bg-green-500"
                : index < steps.findIndex((s) => s.id === currentStep)
                ? "bg-green-500"
                : "bg-gray-200"
            } flex items-center justify-center`}
          >
            <div className="h-3 w-3 rounded-full bg-white" />
          </div>
          <span
            className={`mt-2 text-sm ${
              currentStep === step.id
                ? "text-green-500 font-medium"
                : "text-gray-500"
            }`}
          >
            {step.label}
          </span>
        </div>
      ))}
      <div className="absolute left-0 top-4 -z-10 h-[2px] w-full bg-gray-200">
        <div
          className="h-full bg-green-500 transition-all duration-300"
          style={{
            width: `${
              ((steps.findIndex((step) => step.id === currentStep) + 1) /
                steps.length) *
              100
            }%`,
          }}
        />
      </div>
    </div>
  );
}
