import { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
 
export const metadata: Metadata = {
  title: "ABC Portfolio",
  description: "Developer portfolio and technical blog",
};
 
export default function Home() {
  return (
    <div className="max-w-5xl mx-auto px-4 md:px-8">
 
      {/* Hero */}
      <section className="min-h-[90vh] flex flex-col justify-center">
        <Badge variant="outline" className="w-fit mb-6 text-emerald-400 border-emerald-800">
          Available for work
        </Badge>
        <h1 className="text-5xl md:text-7xl font-bold mb-4">ABC</h1>
        <h2 className="text-xl text-muted-foreground font-mono mb-6">Full-Stack Developer</h2>
        <p className="text-muted-foreground max-w-xl leading-relaxed mb-10">
          I build fast, reliable web applications and write about the problems I solve along the way.
        </p>
        <div className="flex gap-4">
          <Button asChild><a href="/projects">View My Work</a></Button>
          <Button asChild variant="outline"><a href="/blog">Read the Blog</a></Button>
        </div>
      </section>
 
      <Separator />
 
      {/* About */}
      <section className="py-24">
        <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-2">About</p>
        <h3 className="text-3xl font-bold mb-6">Who I Am</h3>
        <p className="text-muted-foreground max-w-2xl leading-relaxed">
          A developer who cares about craft, performance, and writing code that lasts.
        </p>
      </section>
 
      <Separator />
 
      {/* Projects */}
      <section className="py-24">
        <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-2">Projects</p>
        <h3 className="text-3xl font-bold mb-6">Selected Work</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2].map((i) => (
            <Card key={i} className="min-h-[160px] flex items-end p-6">
              <span className="text-muted-foreground text-sm font-mono">Project {i} — coming soon</span>
            </Card>
          ))}
        </div>
      </section>
 
      <Separator />
 
      {/* Blog */}
      <section className="py-24">
        <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-2">Blog</p>
        <h3 className="text-3xl font-bold mb-6">Latest Writing</h3>
        <div className="flex flex-col divide-y">
          {[1, 2].map((i) => (
            <div key={i} className="flex justify-between py-4">
              <span className="text-muted-foreground text-sm">Post title {i} — coming soon</span>
              <span className="text-muted-foreground text-xs font-mono">— —</span>
            </div>
          ))}
        </div>
        <Button asChild variant="ghost" className="mt-6 px-0 font-mono">
          <a href="/blog">All posts →</a>
        </Button>
      </section>
 
    </div>
  );
}