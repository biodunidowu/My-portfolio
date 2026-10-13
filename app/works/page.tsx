import { ViewTransition } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WorksGrid from "@/components/works/WorkGrid";
import { pageTransition } from "@/lib/transitions";
import PersonalExplorations from "@/components/works/PersonalExplorations";
import FooterSection from "@/components/core/Footer";
import HatchBand from "@/components/core/HatchBand";

const tabClass =
  "h-auto flex-1 rounded-none border-0 border-r border-line px-3 py-2.5 font-mono text-[13px] leading-normal font-medium whitespace-nowrap text-fg-muted uppercase first:border-l hover:text-fg data-active:bg-page data-active:text-fg sm:text-sm";

const Works = () => {
  return (
    <ViewTransition {...pageTransition}>
      <main id="works" className="overflow-x-clip pt-8">
        <Tabs defaultValue="case-studies" className="w-full gap-0">
          <HatchBand>
            <TabsList className="relative h-full w-full max-w-114 rounded-xl border-b border-line bg-surface p-0 px-3">
              <TabsTrigger value="case-studies" className={tabClass}>
                Case-Studies
              </TabsTrigger>

              <TabsTrigger value="personal-explorations" className={tabClass}>
                Personal Explorations
              </TabsTrigger>
            </TabsList>
          </HatchBand>

          <TabsContent value="case-studies" className="anim-rise-in duration-normal ease-out-quart mt-8 mb-6 px-4 md:mt-14.25 md:mb-5.5 md:px-8">
            <WorksGrid />
          </TabsContent>

          <TabsContent value="personal-explorations" className="anim-rise-in duration-normal ease-out-quart mt-8 mb-6 px-4 md:mt-10 md:mb-21.25 md:px-8">
            <PersonalExplorations />
          </TabsContent>
        </Tabs>
      </main>

      <FooterSection />
    </ViewTransition>
  );
};

export default Works;
