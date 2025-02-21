
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

const ThankYouScreen = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-purple-50/90 to-white/90 backdrop-blur-md z-50"
  >
    <div className="text-center space-y-4 bg-white p-8 rounded-2xl shadow-lg">
      <h2 className="text-4xl font-semibold text-purple-800">Thank You!</h2>
      <p className="text-purple-600">Your purchase was successful</p>
      <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
        <svg
          className="w-8 h-8 text-green-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
    </div>
  </motion.div>
);

const Index = () => {
  const [padCount, setPadCount] = useState(12);
  const [selectedPads, setSelectedPads] = useState(1);
  const [showThankYou, setShowThankYou] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    if (padCount < selectedPads) {
      toast.error("Not enough pads available");
      return;
    }

    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setPadCount(prev => prev - selectedPads);
    setShowThankYou(true);
    setTimeout(() => {
      setShowThankYou(false);
      setIsProcessing(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-purple-50 to-white p-6">
      <AnimatePresence>
        {showThankYou && <ThankYouScreen />}
      </AnimatePresence>

      <div className="max-w-md mx-auto space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-3"
        >
          <h1 className="text-4xl font-bold text-purple-900 tracking-tight">
            Smart Vend
          </h1>
          <p className="text-sm text-purple-600 font-medium bg-purple-50 inline-block px-4 py-1 rounded-full">
            Hygiene Products Dispenser
          </p>
        </motion.div>

        <Card className="p-8 space-y-8 glass-card shadow-xl border-purple-100/50">
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-purple-50/50 p-4 rounded-lg text-center">
                <span className="text-sm text-purple-600 block mb-1">Location</span>
                <span className="font-semibold text-purple-900">B block 123</span>
              </div>
              <div className="bg-purple-50/50 p-4 rounded-lg text-center">
                <span className="text-sm text-purple-600 block mb-1">Machine ID</span>
                <span className="font-mono text-sm text-purple-900">Gg234tyl9</span>
              </div>
            </div>

            <div className="space-y-6 pt-4">
              <div className="bg-purple-50/50 p-4 rounded-lg flex justify-between items-center">
                <span className="text-purple-600">Pads Available:</span>
                <span className="font-semibold text-purple-900 text-lg">{padCount}</span>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-purple-600">Pads Selected:</span>
                  <div className="flex items-center space-x-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedPads(Math.max(1, selectedPads - 1))}
                      disabled={selectedPads <= 1}
                      className="border-purple-200 hover:bg-purple-50"
                    >
                      -
                    </Button>
                    <span className="font-semibold text-lg text-purple-900 w-8 text-center">
                      {selectedPads}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedPads(Math.min(5, selectedPads + 1))}
                      disabled={selectedPads >= 5 || selectedPads >= padCount}
                      className="border-purple-200 hover:bg-purple-50"
                    >
                      +
                    </Button>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-white p-6 rounded-xl">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-purple-600">Total Price:</span>
                    <span className="font-bold text-2xl text-purple-900">₹{selectedPads * 5}</span>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-white p-6 rounded-xl shadow-inner aspect-square max-w-[200px] mx-auto flex items-center justify-center border border-purple-100">
                      <span className="text-purple-400">QR Code</span>
                    </div>
                    <Button
                      className="w-full py-6 text-lg bg-purple-600 hover:bg-purple-700 transition-all duration-200"
                      onClick={handlePayment}
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <span className="flex items-center space-x-2">
                          <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                              fill="none"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          Processing...
                        </span>
                      ) : (
                        "Scan to Pay"
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Index;
