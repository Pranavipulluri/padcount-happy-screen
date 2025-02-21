
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

const ThankYouScreen = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    className="fixed inset-0 flex items-center justify-center bg-white/90 backdrop-blur-sm z-50"
  >
    <div className="text-center space-y-4">
      <h2 className="text-3xl font-semibold text-gray-800">Thank You!</h2>
      <p className="text-gray-600">Your purchase was successful</p>
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
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setPadCount(prev => prev - selectedPads);
    setShowThankYou(true);
    
    // Hide thank you screen after 2 seconds
    setTimeout(() => {
      setShowThankYou(false);
      setIsProcessing(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white p-6">
      <AnimatePresence>
        {showThankYou && <ThankYouScreen />}
      </AnimatePresence>

      <div className="max-w-md mx-auto space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-2"
        >
          <h1 className="text-3xl font-semibold text-gray-800">
            Welcome To Smart Vend
          </h1>
          <p className="text-sm text-purple-600 font-medium">
            Hygiene Products Dispenser
          </p>
        </motion.div>

        <Card className="p-6 space-y-6 glass-card">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Location:</span>
              <span className="font-medium">B block 123</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-600">Machine ID:</span>
              <span className="font-mono text-sm">Gg234tyl9</span>
            </div>

            <div className="border-t border-gray-100 pt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Pads Available:</span>
                <span className="font-medium">{padCount}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600">Pads Selected:</span>
                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedPads(Math.max(1, selectedPads - 1))}
                    disabled={selectedPads <= 1}
                  >
                    -
                  </Button>
                  <span className="font-medium w-8 text-center">{selectedPads}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedPads(Math.min(5, selectedPads + 1))}
                    disabled={selectedPads >= 5 || selectedPads >= padCount}
                  >
                    +
                  </Button>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-gray-600">Total Price:</span>
                  <span className="font-semibold text-lg">₹{selectedPads * 5}</span>
                </div>

                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg aspect-square max-w-[200px] mx-auto flex items-center justify-center">
                    <span className="text-gray-400">QR Code</span>
                  </div>
                  <Button
                    className="w-full py-6"
                    onClick={handlePayment}
                    disabled={isProcessing}
                  >
                    {isProcessing ? "Processing..." : "Scan to Pay"}
                  </Button>
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

