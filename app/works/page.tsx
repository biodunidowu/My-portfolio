import { ViewTransition } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WorksGrid from "@/components/works/WorkGrid";
import { pageTransition } from "@/lib/transitions";
import PersonalExplorations from "@/components/works/PersonalExplorations";

const Works = () => {
  return (
    <ViewTransition {...pageTransition}>
      <main id="works" className="px-6 lg:py-16 py-8">
        <Tabs defaultValue="case-studies" className="w-full">
          <div className="flex justify-center">
            <TabsList className="gap-1 rounded-[12px] p-3! h-16.25 border border-[#EAECF0] bg-white md:w-114">
              <TabsTrigger
                value="case-studies"
                className="px-6 py-2.5 text-sm font-medium text-[#9CA3AF] data-active:bg-[#F9FAFB]! data-active:text-[#101828] rounded-none"
              >
                Case-Studies
              </TabsTrigger>

              <TabsTrigger
                value="personal-explorations"
                className="px-6 py-2.5 text-sm font-medium text-[#9CA3AF] data-active:bg-[#F9FAFB]! data-active:text-[#101828] rounded-none"
              >
                Personal Explorations
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="case-studies">
            <WorksGrid />
          </TabsContent>

          <TabsContent value="personal-explorations">
            <PersonalExplorations />
          </TabsContent>
        </Tabs>
      </main>
    </ViewTransition>
  );
};

export default Works;
