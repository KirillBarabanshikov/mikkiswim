export interface AccordionItem {
  id: string | number
  title: string | number
  content?: string | number
}

export interface Accordion {
  list: AccordionItem[]
}
