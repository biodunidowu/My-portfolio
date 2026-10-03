import Header from "@/components/core/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Works = () => {
  return (
    <div>
      <Header />

      <section id="works" className="px-6 py-20">
        <Tabs defaultValue="case-studies" className="w-full">
          <div className="mb-16 flex justify-center">
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
            {/* <WorksGrid items={caseStudies} /> */}
          </TabsContent>

          <TabsContent value="personal-explorations"></TabsContent>
        </Tabs>
      </section>
    </div>
  );
};

export default Works;
