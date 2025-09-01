import { Separator } from "@/components/ui/separator";
import { 
  Calendar,
  Award,
} from 'lucide-react';
import { Badge } from "@/components/ui/badge";

const FooterSection = () => {
  return (
    <footer className="bg-background border-t py-12 px-4 sm:px-8 lg:px-16">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white">
                  <Calendar className="h-4 w-4" />
                </div>
                <span className="text-xl font-bold">EduSchedPro</span>
              </div>
              <p className="text-muted-foreground mb-4 max-w-md">
                Intelligent scheduling solution for modern education institutions. 
                Built for Smart India Hackathon 2025 with NEP 2020 compliance and 
                government-grade security.
              </p>
              <div className="flex space-x-2">
                <Badge variant="secondary">SIH 2025</Badge>
                <Badge variant="secondary">NEP 2020</Badge>
                <Badge variant="secondary">Government Ready</Badge>
              </div>
            </div>

            {/* Product Links */}
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Features</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Pricing</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Demo</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">API Documentation</a></li>
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Help Center</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Contact Us</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Training</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Implementation</a></li>
              </ul>
            </div>
          </div>
          
          <Separator className="my-8" />
          
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © 2025 EduScheduler Pro. Built for Smart India Hackathon 2025.
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <Badge variant="outline" className="text-primary border-primary">
                <Award className="mr-1 h-3 w-3" />
                SIH 2025 Finalist
              </Badge>
            </div>
          </div>
        </div>
      </footer>
  )
}

export default FooterSection