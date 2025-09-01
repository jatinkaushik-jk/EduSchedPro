import { Button } from "@/components/ui/button";
import { 
  Calendar,
  CheckCircle,
  ArrowRight,
} from 'lucide-react';

const CtaSection = () => {
  return (
    <section id="demo" className="py-20 secondaryGradient px-4 sm:px-8 lg:px-16">
          <div className="container text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6 text-white">
              Ready to Transform Your Institution?
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-10">
              Join the future of educational scheduling with EduSchedPro. 
              Built for Smart India Hackathon 2025 and ready for government deployment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary">
                <Calendar className="mr-2 h-5 w-5" />
                Schedule Demo
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 hover:text-white">
                Download Brochure
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            <div className="mt-12 flex flex-wrap justify-center gap-8 text-blue-100">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                30-day free trial
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                No setup fees
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                24/7 support
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Government-grade security
              </div>
            </div>
          </div>
        </section>
  )
}

export default CtaSection