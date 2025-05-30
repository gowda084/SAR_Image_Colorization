
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const exampleImages = [
  {
    id: 1,
    title: "Urban Area",
    description: "SAR image of an urban landscape with buildings and roads",
    original: "https://images.unsplash.com/photo-1627522460108-215683bdc9f6?q=80&w=500&auto=format&fit=crop",
    colorized: "https://images.unsplash.com/photo-1569533816166-49d08c516a77?q=80&w=500&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Mountainous Terrain",
    description: "SAR image of mountain ranges and valleys",
    original: "https://images.unsplash.com/photo-1579516776128-ba9ebfc6627d?q=80&w=500&auto=format&fit=crop",
    colorized: "https://images.unsplash.com/photo-1549558549-415fe4c37b60?q=80&w=500&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Coastal Region",
    description: "SAR image of coastline and ocean features",
    original: "https://images.unsplash.com/photo-1471922694854-ff1b63b20054?q=80&w=500&auto=format&fit=crop",
    colorized: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?q=80&w=500&auto=format&fit=crop",
  },
];

export function ExampleGallery() {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Example Transformations</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {exampleImages.map((example) => (
          <Card key={example.id} className="overflow-hidden border-radar-purple/30">
            <Tabs defaultValue="before" className="w-full">
              <TabsList className="w-full rounded-none">
                <TabsTrigger value="before" className="flex-1 rounded-none">Before</TabsTrigger>
                <TabsTrigger value="after" className="flex-1 rounded-none">After</TabsTrigger>
              </TabsList>
              
              <TabsContent value="before" className="m-0 p-0">
                <div className="aspect-square relative">
                  <img
                    src={example.original}
                    alt={`Original ${example.title}`}
                    className="object-cover w-full h-full grayscale contrast-125"
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="after" className="m-0 p-0">
                <div className="aspect-square relative">
                  <img
                    src={example.colorized}
                    alt={`Colorized ${example.title}`}
                    className="object-cover w-full h-full"
                  />
                </div>
              </TabsContent>
            </Tabs>
            
            <CardContent className="p-4 bg-radar-teal">
              <h3 className="font-medium text-lg">{example.title}</h3>
              <p className="text-sm text-muted-foreground">{example.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
