import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type TabItem = {
  id: string
  label: string
  content: React.ReactNode
}

type GenericTabsProps = {
  tabs: TabItem[]
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
}

const GenericTabs = ({ tabs, defaultValue, value, onValueChange }: GenericTabsProps) => (
  <Tabs value={value} onValueChange={onValueChange} defaultValue={defaultValue ?? tabs[0]?.id} className="w-fit">
    <TabsList className="grid grid-cols-4">
      {tabs.map((tab) => (
        <TabsTrigger key={tab.id} value={tab.id} className="px-3">
          {tab.label}
        </TabsTrigger>
      ))}
    </TabsList>
    {tabs.map((tab) => (
      <TabsContent key={tab.id} value={tab.id} className="mt-0">
        {tab.content}
      </TabsContent>
    ))}
  </Tabs>
)

export default GenericTabs
