import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { X, Github, Code, Heart } from "lucide-react";

export default function PrototypePopup() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show popup after 2 seconds on first load
    const timer = setTimeout(() => {
      const hasSeenPopup = localStorage.getItem('rdso-prototype-seen');
      if (!hasSeenPopup) {
        setIsVisible(true);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('rdso-prototype-seen', 'true');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[100]"
            onClick={handleClose}
          />
          
          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[101]"
          >
            <Card className="w-96 max-w-[90vw] glassmorphism bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-white/20 dark:border-slate-700/50 shadow-2xl">
              <CardContent className="p-6 relative">
                {/* Close Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2 h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-slate-800"
                  onClick={handleClose}
                  data-testid="close-prototype-popup"
                >
                  <X className="h-4 w-4" />
                </Button>

                {/* Content */}
                <div className="text-center space-y-4">
                  {/* Icon */}
                  <div className="flex justify-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-rdso-blue to-rdso-saffron rounded-2xl flex items-center justify-center">
                      <Code className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Title */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      RDSO Management Dashboard
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Prototype Version
                    </p>
                  </div>

                  {/* Creator Credit */}
                  <div className="bg-gradient-to-r from-rdso-blue/10 to-rdso-saffron/10 dark:from-rdso-blue/20 dark:to-rdso-saffron/20 rounded-lg p-4 border border-rdso-blue/20 dark:border-rdso-blue/30">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <Heart className="w-4 h-4 text-red-500" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Created with passion by
                      </span>
                    </div>
                    <p className="text-lg font-bold text-rdso-blue dark:text-rdso-saffron">
                      Sachida Nand Sharma
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Full-Stack Developer & Railway Technology Enthusiast
                    </p>
                  </div>

                  {/* Features */}
                  <div className="text-left space-y-2">
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                      Key Features:
                    </h4>
                    <ul className="text-xs text-gray-600 dark:text-gray-300 space-y-1">
                      <li>• Role-based Dashboard with 9-tier hierarchy</li>
                      <li>• Employee, Project & Vendor Management</li>
                      <li>• File Tracking & Alert System</li>
                      <li>• Field Activity Monitoring</li>
                      <li>• Training Program Management</li>
                      <li>• Analytics & Reporting Tools</li>
                    </ul>
                  </div>

                  {/* Technology Stack */}
                  <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-3">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                      Built with:
                    </p>
                    <p className="text-xs font-medium text-gray-700 dark:text-gray-300">
                      React • TypeScript • Tailwind CSS • shadcn/ui • Express.js
                    </p>
                  </div>

                  {/* GitHub Link */}
                  <div className="flex space-x-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 text-xs"
                      onClick={handleClose}
                      data-testid="explore-prototype-btn"
                    >
                      Explore Prototype
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1 bg-gray-900 hover:bg-gray-800 text-white text-xs"
                      onClick={() => {
                        window.open('https://github.com/sachidanandharma/rdso-dashboard', '_blank');
                        handleClose();
                      }}
                      data-testid="view-github-btn"
                    >
                      <Github className="w-3 h-3 mr-1" />
                      View on GitHub
                    </Button>
                  </div>

                  <p className="text-xs text-gray-400 dark:text-gray-500 italic">
                    This is a prototype demonstration • Not for production use
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}