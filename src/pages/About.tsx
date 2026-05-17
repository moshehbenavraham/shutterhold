import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import PortfolioHeader from "@/components/PortfolioHeader";
import PortfolioFooter from "@/components/PortfolioFooter";
import SEO from "@/components/SEO";
import { portraitImage } from "@/services/gallery";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import {
  sendContactMessage,
  HAS_CONTACT_ENDPOINT,
  CONTACT_EMAIL,
} from "@/lib/forms";

const contactSchema = z.object({
  name: z.string().trim().min(1, { message: "Name is required" }).max(100, { message: "Name must be less than 100 characters" }),
  email: z.string().trim().email({ message: "Invalid email address" }).max(255, { message: "Email must be less than 255 characters" }),
  message: z.string().trim().min(1, { message: "Message is required" }).max(1000, { message: "Message must be less than 1000 characters" }),
});

type ContactFormValues = z.infer<typeof contactSchema>;

type StatusMessage =
  | { kind: "success"; text: string }
  | { kind: "error"; text: string }
  | null;

const About = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<StatusMessage>(null);
  const { toast } = useToast();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    setStatus(null);

    const result = await sendContactMessage({ ...data, source: "about-page" });

    if (result.ok) {
      const successText =
        result.mode === "mailto"
          ? `Opening your email app with a draft to ${CONTACT_EMAIL}.`
          : "Thank you for your inquiry. I'll get back to you soon.";
      toast({
        title: result.mode === "mailto" ? "Draft ready" : "Message sent",
        description: successText,
      });
      setStatus({ kind: "success", text: successText });
      form.reset();
    } else {
      toast({
        title: "Could not send message",
        description: result.error,
        variant: "destructive",
      });
      setStatus({ kind: "error", text: result.error });
    }

    setIsSubmitting(false);
  };

  const submitLabel = isSubmitting
    ? "Sending..."
    : HAS_CONTACT_ENDPOINT
      ? "Send"
      : "Send via Email";

  return (
    <>
      <SEO
        title="About - Morgan Blake"
        description="Learn about Morgan Blake, a production photographer specializing in fashion, editorial, and commercial photography."
        canonicalUrl="/about"
      />

      <PortfolioHeader
        activeCategory=""
      />

      <main id="main-content" className="min-h-screen">
        <section className="max-w-[1600px] mx-auto pt-20 pb-12 md:pt-24 md:pb-16">
          <div className="text-center space-y-8 mb-16 px-3 md:px-5 max-w-2xl mx-auto">
            <div className="space-y-4">
              <h1 className="font-playfair text-4xl md:text-5xl text-foreground">
                Morgan Blake
              </h1>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-inter">
                PRODUCTION & PHOTOGRAPHY
              </p>
            </div>

            {/* Portrait */}
            {portraitImage && (
              <div className="max-w-xs mx-auto border border-foreground/10 overflow-hidden">
                <picture className="relative block">
                  {portraitImage.width && portraitImage.height && (
                    <svg
                      width={portraitImage.width}
                      height={portraitImage.height}
                      viewBox={`0 0 ${portraitImage.width} ${portraitImage.height}`}
                      className="w-full h-auto"
                    >
                      <rect
                        width={portraitImage.width}
                        height={portraitImage.height}
                        fill="white"
                      />
                    </svg>
                  )}
                  <img
                    src={portraitImage.src}
                    alt={portraitImage.alt}
                    className="absolute top-0 left-0 w-full h-auto grayscale"
                    style={{
                      opacity: 1,
                      transition: 'opacity 0.5s ease-out'
                    }}
                  />
                </picture>
              </div>
            )}
          </div>

          {/* Bio Section */}
          <div className="max-w-2xl mx-auto px-3 md:px-5 space-y-8 text-center text-foreground/80 text-sm leading-relaxed mb-16">
            <p>
              Production photographer specializing in fashion, editorial, and commercial photography.
              Creating compelling imagery with technical precision and creative vision for global brands
              and publications.
            </p>

            <p>
              Full production services including art buying, location scouting, casting, and on-set
              management. Collaborative approach ensuring seamless execution from concept to delivery.
            </p>

            <div className="pt-8">
              <h2 className="font-playfair text-xl text-foreground mb-4">Services</h2>
              <p className="text-foreground/70 text-xs uppercase tracking-wider leading-loose">
                Fashion & Editorial Photography / Commercial Production / Art Buying & Creative Direction /
                Location Scouting / Casting & Talent Coordination
              </p>
            </div>

            <div className="pt-4">
              <h2 className="font-playfair text-xl text-foreground mb-4">Select Clients</h2>
              <p className="text-foreground/70 text-xs uppercase tracking-wider leading-loose">
                Various fashion brands and editorial publications
              </p>
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="max-w-xl mx-auto px-3 md:px-5 pt-16">
            <div className="text-center space-y-4 mb-12">
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-inter">
                INQUIRIES
              </p>
              <h2 className="font-playfair text-4xl md:text-5xl text-foreground">
                Contact
              </h2>
              <p className="text-foreground/80 text-sm leading-relaxed">
                For project inquiries and collaborations.
              </p>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
                noValidate
                aria-describedby="about-contact-form-status"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm uppercase tracking-wider text-foreground/70 font-inter">
                        Name *
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your name"
                          autoComplete="name"
                          className="border-0 border-b border-foreground/20 rounded-none bg-transparent text-foreground px-0 focus-visible:ring-0 focus-visible:border-foreground transition-colors"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm uppercase tracking-wider text-foreground/70 font-inter">
                        Email *
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          inputMode="email"
                          autoComplete="email"
                          placeholder="your@email.com"
                          className="border-0 border-b border-foreground/20 rounded-none bg-transparent text-foreground px-0 focus-visible:ring-0 focus-visible:border-foreground transition-colors"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm uppercase tracking-wider text-foreground/70 font-inter">
                        Message *
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell me about your project..."
                          autoComplete="off"
                          className="border-0 border-b border-foreground/20 rounded-none bg-transparent text-foreground min-h-[150px] px-0 focus-visible:ring-0 focus-visible:border-foreground transition-colors resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="pt-4 text-center space-y-3">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    variant="outline"
                    className="w-full md:w-auto px-12 py-6 text-sm uppercase tracking-widest font-inter border-foreground/40 hover:bg-foreground hover:text-background transition-all"
                  >
                    {submitLabel}
                  </Button>

                  {!HAS_CONTACT_ENDPOINT && (
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-inter">
                      Opens your email app — addressed to {CONTACT_EMAIL}
                    </p>
                  )}

                  <div
                    id="about-contact-form-status"
                    role={status?.kind === "error" ? "alert" : "status"}
                    aria-live={status?.kind === "error" ? "assertive" : "polite"}
                    aria-atomic="true"
                    className="min-h-[1.25rem] text-xs font-inter"
                  >
                    {status && (
                      <span
                        className={
                          status.kind === "error"
                            ? "text-destructive"
                            : "text-foreground/70"
                        }
                      >
                        {status.text}
                      </span>
                    )}
                  </div>
                </div>
              </form>
            </Form>
          </div>
        </section>
      </main>

      <PortfolioFooter />
    </>
  );
};

export default About;
