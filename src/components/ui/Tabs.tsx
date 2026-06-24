type TabItem = {
  id: string
  label: string
}

type Props = {
  tabs: TabItem[]
  activeTab: string
  onChange: (tab: string) => void
}

export function Tabs({ tabs, activeTab, onChange }: Props) {
  return (
    <div className="tabs-wrap">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={activeTab === tab.id ? 'tab-button active' : 'tab-button'}
          onClick={() => onChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
