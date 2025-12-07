import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ThemeToggle } from '@/components/ThemeToggle';
import { ArrowRight, Play, Users, Zap } from 'lucide-react';

function LandingPage() {
  return (
    <div className="min-h-screen w-full relative bg-background">
      {/* Dashed Bottom Left Fade Grid - Light Mode */}
      <div
        className="absolute inset-0 z-0 dark:hidden"
        style={{
          backgroundImage: `
            linear-gradient(to right, #e7e5e4 1px, transparent 1px),
            linear-gradient(to bottom, #e7e5e4 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
          backgroundPosition: '0 0, 0 0',
          maskImage: `
            repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            radial-gradient(ellipse 80% 80% at 100% 100%, #000 50%, transparent 90%)
          `,
          WebkitMaskImage: `
            repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            radial-gradient(ellipse 80% 80% at 100% 100%, #000 50%, transparent 90%)
          `,
          maskComposite: 'intersect',
          WebkitMaskComposite: 'source-in',
        }}
      />

      {/* Dashed Bottom Left Fade Grid - Dark Mode */}
      <div
        className="absolute inset-0 z-0 hidden dark:block opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(to right, #52525b 1px, transparent 1px),
            linear-gradient(to bottom, #52525b 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
          backgroundPosition: '0 0, 0 0',
          maskImage: `
            repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            radial-gradient(ellipse 80% 80% at 100% 100%, #000 50%, transparent 90%)
          `,
          WebkitMaskImage: `
            repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            radial-gradient(ellipse 80% 80% at 100% 100%, #000 50%, transparent 90%)
          `,
          maskComposite: 'intersect',
          WebkitMaskComposite: 'source-in',
        }}
      />

      {/* Floating Theme Toggle */}
      <div className="fixed bottom-6 right-6 z-50">
        <ThemeToggle variant="outline" size="icon" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="container mx-auto px-6 py-24 min-h-screen flex flex-col justify-center">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              Distributed Task Queue
              <span className="block text-muted-foreground mt-2">Visualization</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Watch tasks flow through workers in real-time. Submit, process, and complete—all visualized.
            </p>
            <div className="flex gap-4 justify-center pt-4">
              <Button asChild size="lg" className="gap-2">
                <Link to="/dashboard">
                  Play Around
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="container mx-auto px-6 py-24">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-foreground flex items-center justify-center mb-4">
                    <Play className="h-6 w-6 text-background" />
                  </div>
                  <CardTitle>Submit Tasks</CardTitle>
                  <CardDescription>
                    Create tasks with different complexity levels (LOW, MEDIUM, HIGH) and submit them to the queue
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-foreground flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-background" />
                  </div>
                  <CardTitle>Manage Workers</CardTitle>
                  <CardDescription>
                    Add or remove workers to control processing capacity. Watch as tasks are automatically distributed
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-foreground flex items-center justify-center mb-4">
                    <Zap className="h-6 w-6 text-background" />
                  </div>
                  <CardTitle>Watch Real-Time</CardTitle>
                  <CardDescription>
                    See tasks move through PENDING, PROCESSING, COMPLETED, and FAILED states on a live Kanban board
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>

            <div className="text-center mt-16">
              <Button asChild size="lg" variant="outline" className="gap-2">
                <Link to="/dashboard">
                  Play Around
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="container mx-auto px-6 py-12 border-t">
          <div className="text-center text-sm text-muted-foreground">
            <p>Built as a learning tool to visualize distributed task processing</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default LandingPage;
