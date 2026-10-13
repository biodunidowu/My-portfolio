import { ViewTransition } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WorksGrid from "@/components/works/WorkGrid";
import { pageTransition } from "@/lib/transitions";
import PersonalExplorations from "@/components/works/PersonalExplorations";
import FooterSection from "@/components/core/Footer";
import TabBand from "@/components/works/TabBand";

const tabClass =
  "h-auto flex-1 rounded-none border-0 border-r border-[#EAECF0] px-3 py-2.5 text-sm leading-normal font-medium text-[#98A2B3] first:border-l hover:text-[#101828] data-active:bg-[#F9FAFB] data-active:text-[#101828]";

const Works = () => {
  return (
    <ViewTransition {...pageTransition}>
      <main id="works" className="pt-7.75 pb-21">
        <Tabs defaultValue="case-studies" className="w-full gap-0">
          <div className="relative flex h-16.25 justify-center border-y border-[#F2F4F7] px-4">
            <TabBand />

            <TabsList className="relative h-full w-full max-w-114 rounded-xl border-b border-[#EAECF0] bg-white p-0 px-3">
              <TabsTrigger value="case-studies" className={tabClass}>
                Case Studies
              </TabsTrigger>

              <TabsTrigger value="personal-explorations" className={tabClass}>
                Personal Explorations
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="case-studies" className="mt-10 px-4 md:px-8">
            <WorksGrid />
          </TabsContent>

          <TabsContent value="personal-explorations" className="mt-7.75 px-4 md:px-8">
            <PersonalExplorations />
          </TabsContent>
        </Tabs>
      </main>

      <FooterSection />
    </ViewTransition>
  );
};

export default Works;
