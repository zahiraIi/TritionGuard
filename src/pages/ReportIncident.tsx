
import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, Camera, MapPin, AlertTriangle, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ReportIncident = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const reportType = searchParams.get('type') || 'general';
  const [description, setDescription] = useState('');
  const [severity, setSeverity] = useState('medium');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [photoTaken, setPhotoTaken] = useState(false);

  const severityOptions = [
    { value: 'low', label: 'Low Priority', color: 'bg-yellow-500' },
    { value: 'medium', label: 'Medium Priority', color: 'bg-orange-500' },
    { value: 'high', label: 'High Priority', color: 'bg-red-500' },
    { value: 'critical', label: 'Critical - Immediate Danger', color: 'bg-red-700' }
  ];

  const handleTakePhoto = () => {
    // In a real app, this would use Capacitor Camera plugin
    setPhotoTaken(true);
    toast({
      title: "Photo captured",
      description: "Evidence photo has been securely stored",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      toast({
        title: "Report submitted successfully",
        description: "Community members have been alerted. Stay safe.",
      });
      navigate("/map");
    }, 2000);
  };

  const getReportTypeInfo = (type: string) => {
    switch (type) {
      case 'police':
        return { title: 'Police Activity Report', icon: AlertTriangle, color: 'orange' };
      case 'ice':
        return { title: 'ICE Activity Report', icon: AlertTriangle, color: 'red' };
      default:
        return { title: 'General Incident Report', icon: AlertTriangle, color: 'blue' };
    }
  };

  const reportInfo = getReportTypeInfo(reportType);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center space-x-4 mb-6"
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/map")}
            className="text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-2xl font-bold">{reportInfo.title}</h1>
        </motion.div>

        {/* Current Location */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-gray-800 border border-gray-700 rounded-xl p-4 mb-6"
        >
          <div className="flex items-center space-x-3">
            <MapPin className="w-5 h-5 text-blue-400" />
            <div>
              <p className="font-semibold">Current Location</p>
              <p className="text-sm text-gray-300">Library Walk, UCSD Campus</p>
            </div>
          </div>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Severity Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-3"
          >
            <label className="block text-sm font-semibold text-gray-200">
              Urgency Level
            </label>
            <div className="grid grid-cols-1 gap-2">
              {severityOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setSeverity(option.value)}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    severity === option.value
                      ? `${option.color} border-white/50`
                      : 'bg-gray-700 border-gray-600 hover:border-gray-500'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Photo Capture */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-3"
          >
            <label className="block text-sm font-semibold text-gray-200">
              Evidence (Optional)
            </label>
            <Button
              type="button"
              onClick={handleTakePhoto}
              className={`w-full p-4 rounded-xl flex items-center justify-center space-x-2 ${
                photoTaken 
                  ? 'bg-green-700 hover:bg-green-600' 
                  : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              <Camera className="w-5 h-5" />
              <span>{photoTaken ? 'Photo Captured ✓' : 'Take Photo'}</span>
            </Button>
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-3"
          >
            <label className="block text-sm font-semibold text-gray-200">
              Additional Details (Optional)
            </label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe what you observed... (optional for safety)"
              className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 min-h-24"
            />
          </motion.div>

          {/* Time Stamp */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gray-800 border border-gray-700 rounded-xl p-4"
          >
            <div className="flex items-center space-x-3">
              <Clock className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm font-semibold">Report Time</p>
                <p className="text-sm text-gray-300">{new Date().toLocaleString()}</p>
              </div>
            </div>
          </motion.div>

          {/* Submit Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Button
              type="submit"
              disabled={isSubmitting}
              className={`w-full p-4 rounded-xl font-semibold text-lg ${
                reportType === 'ice' 
                  ? 'bg-red-600 hover:bg-red-700' 
                  : reportType === 'police'
                  ? 'bg-orange-600 hover:bg-orange-700'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {isSubmitting ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                />
              ) : (
                'Submit Anonymous Report'
              )}
            </Button>
          </motion.div>
        </form>

        {/* Safety Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-6 bg-blue-800/30 border border-blue-700 rounded-xl p-4"
        >
          <p className="text-blue-200 text-sm text-center">
            Your report is completely anonymous and helps keep our community safe
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default ReportIncident;
