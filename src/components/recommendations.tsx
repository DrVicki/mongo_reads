import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { PersonalizedBookRecommendationsOutput } from "@/ai/flows/personalized-book-recommendations";

interface RecommendationsProps {
  recommendations: PersonalizedBookRecommendationsOutput;
}

export default function Recommendations({ recommendations }: RecommendationsProps) {
  if (!recommendations.length) return null;

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2 text-center font-headline">You Might Also Like...</h3>
      <Accordion type="single" collapsible className="w-full">
        {recommendations.map((rec, index) => (
          <AccordionItem value={`item-${index}`} key={index}>
            <AccordionTrigger className="text-left">
              <div className="flex flex-col">
                <span className="font-semibold">{rec.title}</span>
                <span className="text-sm text-muted-foreground">{rec.author}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-sm">
                <p className="font-medium">Why you might like it:</p>
                <p className="text-muted-foreground">{rec.reason}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
