import React from "react";
import { Accordion, AccordionItem, AccordionTrigger,  AccordionContent,} from "@/components/ui/accordion";
import MotionWrapper from "./ui/motion-wrapper";


export default function FAQ() {

  // FAQ data
  const faqs = [
    { 
      question: "What is this service and how does it work?",
      answer: "MovieNest is an online streaming platform that allows you to watch movies and TV shows instantly on any device. Simply sign up, browse the library, and start streaming without downloads or long loading times.",
    },
    {
      question: "Is it free to use?",
      answer: "Yes! You can watch a wide range of content for free. You can also bookmark your favorite movies and shows to watch later.",
    },
    {
      question: "Which devices can I use to watch?",
      answer: "The service works on all major devices including smartphones, tablets, smart TVs, laptops, and desktop computers.",
    },
    {
      question: "How often is new content added?",
      answer: "The library is updated weekly with new movies, trending shows, and exclusive content so there's always something fresh to watch.",
    },
    {
      question: "Does it offer personalized recommendations?",
      answer: "Yes! Personalized recommendations are provided based on your watch history to help you discover new movies and shows.",
    },
    {
      question: "Is my personal data safe?",
      answer: "Your security is a priority. Advanced encryption is used to protect your data, and personal information is never shared with third parties.",
    },
  ];

  return (
    <MotionWrapper delay={0.2} variant="fadeIn">
      <section id="faq" className="space-y-8 py-20 md:py-12 lg:py-8">
        {/* header */}
        <div className="flex flex-col items-center gap-3 text-center px-4">
          <h2 className="text-3xl md:text-4xl font-semibold font-mono">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Find answers to the most common questions about using MovieNest.
          </p>
        </div>

        {/* accordion */}
        <div className="max-w-5xl mx-auto px-4">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`faq-${index}`}>
                <AccordionTrigger className="text-left text-lg ">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </MotionWrapper>
  );
}
